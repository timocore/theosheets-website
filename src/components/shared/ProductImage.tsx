"use client";

import { useState } from "react";
import { getProductPlaceholderImage } from "@/lib/placeholders";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Slug for fallback placeholder when image fails to load */
  fallbackSlug?: string;
}

/** Use native img for all product images - avoids Next.js Image issues with S3, external URLs, and placeholders */
export function ProductImage({ src, alt, fill, className, fallbackSlug }: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  function handleError() {
    if (fallbackSlug && !currentSrc.includes("placehold.co")) {
      setCurrentSrc(getProductPlaceholderImage(fallbackSlug));
    }
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }
          : undefined
      }
    />
  );
}
