// Use placehold.co for reliable loading (parchment bg, charcoal text, sheet-music look)
export const PRODUCT_PLACEHOLDER_IMAGES = [
  "https://placehold.co/400x533/EDE6DC/6B635B?text=Sheet+Music",
  "https://placehold.co/400x533/F5F0E8/3D3630?text=Score",
  "https://placehold.co/400x533/FAF8F5/6B635B?text=Piano",
];

export function getProductPlaceholderImage(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash << 5) - hash + slug.charCodeAt(i);
  const idx = Math.abs(hash) % PRODUCT_PLACEHOLDER_IMAGES.length;
  return PRODUCT_PLACEHOLDER_IMAGES[idx];
}

/** Check if a string is a valid displayable image URL (not an S3 key or relative path) */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/");
}

/** Check if URL is from S3 (needs presigned proxy for private buckets) */
export function isS3Url(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  return url.includes(".s3.") && url.includes("amazonaws.com");
}

/** Convert S3 URL to proxy URL for reliable loading (handles private buckets) */
export function getProxiedImageUrl(url: string): string {
  if (isS3Url(url)) {
    return `/api/image?url=${encodeURIComponent(url)}`;
  }
  return url;
}
