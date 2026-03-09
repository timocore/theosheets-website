import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrlForS3Url, getS3ObjectStream, parseS3Url } from "@/lib/s3";

/** Allowed S3 bucket patterns for proxy (security: avoid SSRF). Works for images and audio. */
const ALLOWED_S3_HOSTS = [
  /\.s3\.amazonaws\.com$/,
  /\.s3\.[a-z0-9-]+\.amazonaws\.com$/,
];

function isAllowedS3Url(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_S3_HOSTS.some((pattern) => pattern.test(parsed.hostname));
  } catch {
    return false;
  }
}

function isAudioUrl(url: string): boolean {
  const ext = url.split(".").pop()?.toLowerCase().split("?")[0];
  return ["mp3", "wav", "ogg", "m4a", "aac"].includes(ext ?? "");
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const decodedUrl = decodeURIComponent(url);
  if (!isAllowedS3Url(decodedUrl)) {
    return NextResponse.json({ error: "Invalid or disallowed URL" }, { status: 400 });
  }

  const parsed = parseS3Url(decodedUrl);
  if (!parsed) {
    return NextResponse.json({ error: "Could not parse S3 URL" }, { status: 400 });
  }

  const presignedUrl = await getPresignedUrlForS3Url(decodedUrl, 3600); // 1 hour
  if (!presignedUrl) {
    return NextResponse.json(
      { error: "Failed to generate presigned URL. Check S3 credentials and bucket access." },
      { status: 502 }
    );
  }

  // For audio: stream directly from S3 (more reliable than fetch + presigned URL)
  if (isAudioUrl(decodedUrl)) {
    const rangeHeader = req.headers.get("range");
    const result = await getS3ObjectStream(decodedUrl, rangeHeader ?? undefined);
    if (!result) {
      console.error(
        "[api/image] Audio stream failed for:",
        decodedUrl,
        "- Check AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and s3:GetObject permission"
      );
      return NextResponse.json(
        { error: "Failed to stream audio. Check S3 credentials and bucket access." },
        { status: 502 }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": result.contentType,
      "Accept-Ranges": "bytes",
    };
    if (result.contentLength) headers["Content-Length"] = String(result.contentLength);
    if (result.contentRange) headers["Content-Range"] = result.contentRange;

    return new NextResponse(result.body, {
      status: rangeHeader ? 206 : 200,
      headers,
    });
  }

  // For images: redirect (works well)
  return NextResponse.redirect(presignedUrl, 302);
}
