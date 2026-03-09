import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION ?? "us-east-1";
const bucket = process.env.S3_BUCKET;
const privatePrefix = process.env.S3_PRIVATE_PREFIX ?? "private/";
const previewPrefix = process.env.S3_PREVIEW_PREFIX ?? "preview/";

export const s3Client =
  bucket &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY
    ? new S3Client({
        region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      })
    : null;

/**
 * Check if an S3 key is a placeholder (not yet uploaded).
 * Placeholder keys follow the pattern: pending/orderId/productId/assetType
 */
export function isPlaceholderKey(key: string): boolean {
  return key.startsWith("pending/");
}

/**
 * Generate a presigned URL for downloading a private file.
 * URL expires after 1 hour (configurable).
 * Optional filename for Content-Disposition header.
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn = 3600,
  filename?: string
): Promise<string | null> {
  if (!s3Client || !bucket) return null;
  if (isPlaceholderKey(key)) return null;

  try {
    const safeFilename = filename
      ? filename.replace(/[^a-zA-Z0-9._-]/g, "_")
      : undefined;
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      ...(safeFilename && {
        ResponseContentDisposition: `attachment; filename="${safeFilename}"`,
      }),
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("S3 presigned URL error:", error);
    return null;
  }
}

/**
 * Check if an object exists in S3.
 */
export async function objectExists(key: string): Promise<boolean> {
  if (!s3Client || !bucket || isPlaceholderKey(key)) return false;

  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate a presigned URL for uploading a file (admin use).
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<string | null> {
  if (!s3Client || !bucket) return null;

  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("S3 presigned upload error:", error);
    return null;
  }
}

export const S3_CONFIG = {
  bucket: bucket ?? null,
  privatePrefix,
  previewPrefix,
  isConfigured: !!s3Client,
};

/**
 * Parse an S3 URL and extract bucket, key, and region.
 * Supports: https://bucket.s3.region.amazonaws.com/key and https://s3.region.amazonaws.com/bucket/key
 */
export function parseS3Url(url: string): { bucket: string; key: string; region: string } | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    // Decode pathname for keys with % encoded chars (e.g. %2B -> +)
    // In URLs, + in path can mean space; try both key variants
    let key = decodeURIComponent(parsed.pathname.replace(/^\//, ""));

    // Format: bucket.s3.region.amazonaws.com or bucket.s3.amazonaws.com
    const match1 = host.match(/^([a-z0-9.-]+)\.s3\.([a-z0-9-]+)\.amazonaws\.com$/);
    if (match1) {
      const [, bucketName, region] = match1;
      return { bucket: bucketName, key, region };
    }
    const match2 = host.match(/^([a-z0-9.-]+)\.s3\.amazonaws\.com$/);
    if (match2) {
      const [, bucketName] = match2;
      return { bucket: bucketName, key, region: "us-east-1" };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Generate a presigned URL for an S3 object from a full S3 URL.
 * Uses credentials from env; works for any bucket the credentials can access.
 */
export async function getPresignedUrlForS3Url(
  s3Url: string,
  expiresIn = 3600
): Promise<string | null> {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) return null;
  const parsed = parseS3Url(s3Url);
  if (!parsed) return null;

  try {
    const client = new S3Client({
      region: parsed.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const command = new GetObjectCommand({
      Bucket: parsed.bucket,
      Key: parsed.key,
    });
    const url = await getSignedUrl(client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("S3 presigned URL error:", error);
    return null;
  }
}

/**
 * Get S3 object as a stream for proxying. Uses credentials from env.
 * Tries key as-is, then with + replaced by space (S3 console often uses spaces).
 */
export async function getS3ObjectStream(
  s3Url: string,
  range?: string
): Promise<{
  body: ReadableStream;
  contentType: string;
  contentLength?: number;
  contentRange?: string;
} | null> {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) return null;
  const parsed = parseS3Url(s3Url);
  if (!parsed) return null;

  const keysToTry = [
    parsed.key,
    parsed.key.replace(/\+/g, " "), // URL + often means space in S3 keys
  ].filter((k, i, arr) => arr.indexOf(k) === i); // unique

  for (const key of keysToTry) {
    try {
      const client = new S3Client({
        region: parsed.region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
      const command = new GetObjectCommand({
        Bucket: parsed.bucket,
        Key: key,
        ...(range && { Range: range }),
      });
      const response = await client.send(command);
      const body = response.Body;
      if (!body) continue;

      const contentType = response.ContentType ?? "audio/mpeg";
      const contentLength = response.ContentLength;
      const contentRange = response.ContentRange;

      return {
        body: body as unknown as ReadableStream,
        contentType,
        contentLength: contentLength ?? undefined,
        contentRange: contentRange ?? undefined,
      };
    } catch (error) {
      if (key !== keysToTry[keysToTry.length - 1]) continue;
      console.error("S3 get object error:", error);
      return null;
    }
  }
  return null;
}
