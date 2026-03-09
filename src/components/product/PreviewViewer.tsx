"use client";

import { useState } from "react";
import { ProductImage } from "@/components/shared/ProductImage";

interface PreviewViewerProps {
  children: React.ReactNode;
  imageUrl: string | null;
  previewPdfUrl: string | null;
  previewPageImages: string[];
  productTitle: string;
}

export function PreviewViewer({
  children,
  imageUrl,
  previewPdfUrl,
  previewPageImages,
  productTitle,
}: PreviewViewerProps) {
  const [open, setOpen] = useState(false);

  const hasContent = imageUrl || previewPdfUrl || previewPageImages.length > 0;

  if (!hasContent) {
    return <>{children}</>;
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-parchment rounded overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-charcoal/80 text-parchment hover:bg-charcoal transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[90vh]">
              <h2 className="font-serif text-xl text-charcoal mb-4">{productTitle} — Preview</h2>
              <div className="relative inline-block">
                {/* Watermark / preview treatment */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 40px)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <span className="text-charcoal-light/40 text-2xl font-serif rotate-[-25deg] select-none">
                    PREVIEW
                  </span>
                </div>
                {imageUrl ? (
                  <div className="relative aspect-[3/4] w-full max-w-md">
                    <ProductImage
                      src={imageUrl}
                      alt={`Preview of ${productTitle}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : previewPageImages.length > 0 ? (
                  <div className="space-y-4">
                    {previewPageImages.slice(0, 3).map((url, i) => (
                      <div key={i} className="relative aspect-[3/4] w-full max-w-md">
                        <ProductImage
                          src={url}
                          alt={`Preview page ${i + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : previewPdfUrl ? (
                  <iframe
                    src={previewPdfUrl}
                    title={`Preview of ${productTitle}`}
                    className="w-full aspect-[3/4] max-w-md border-0"
                  />
                ) : null}
              </div>
              <p className="mt-4 text-sm text-charcoal-light text-center">
                This is a preview. Purchase to access the full score.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
