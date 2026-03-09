"use client";

import { ProductImage } from "@/components/shared/ProductImage";
import {
  getProductPlaceholderImage,
  getProxiedImageUrl,
  isValidImageUrl,
} from "@/lib/placeholders";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { getDisplayPrices } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";
import { TagPill } from "@/components/shared/TagPill";
import { ReviewSummary } from "@/components/shared/ReviewSummary";
import Link from "next/link";
import { PreviewViewer } from "./PreviewViewer";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { PreviewAudioPlayer } from "./PreviewAudioPlayer";
import { VariantSelector } from "./VariantSelector";

interface ProductHeroProps {
  product: {
    id: string;
    slug: string;
    title: string;
    composer?: string | null;
    shortDescription?: string | null;
    tags: string[];
    productImage?: string | null;
    coverImage?: string | null;
    previewPdfAsset?: string | null;
    previewPageImages?: string[] | null;
    price: number;
    compareAtPrice?: number | null;
    enablePreviewAudio?: boolean;
    previewAudioUrl?: string | null;
    variants: { key: string; name: string; price: number }[];
    [key: string]: unknown;
  };
  reviewStats?: { average: number; count: number };
}

export function ProductHero({ product, reviewStats }: ProductHeroProps) {
  useSaleStore((s) => s.salePercent);
  const rawImage = product.productImage || product.coverImage;
  const imageUrl = getProxiedImageUrl(
    isValidImageUrl(rawImage) ? rawImage! : getProductPlaceholderImage(product.slug)
  );
  const hasPreviewPdf = !!(product.previewPdfAsset || product.previewPageImages?.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left: Image / Preview area */}
      <div className="relative">
        <div className="relative aspect-[3/4] bg-parchment-dark rounded overflow-hidden">
          <ImageLightbox src={imageUrl} alt={product.title}>
            <ProductImage
              src={imageUrl}
              alt={product.title}
              fill
              fallbackSlug={product.slug}
              className="object-cover hover:opacity-95 transition-opacity"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </ImageLightbox>
        </div>
        {hasPreviewPdf && !isValidImageUrl(rawImage) && (
          <PreviewViewer
            imageUrl={null}
            previewPdfUrl={product.previewPdfAsset}
            previewPageImages={product.previewPageImages ?? []}
            productTitle={product.title}
          >
            <button className="mt-3 w-full py-2.5 border border-border-warm rounded text-sm font-medium text-charcoal hover:bg-parchment-dark transition-colors">
              Preview score
            </button>
          </PreviewViewer>
        )}
      </div>

      {/* Right: Product info */}
      <div>
        <p className="text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">
          Digital sheet music
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
          {product.title}
        </h1>
        {product.composer && (
          <p className="text-charcoal-light mb-3">by {product.composer}</p>
        )}
        <ReviewSummary
          average={reviewStats?.average}
          count={reviewStats?.count}
          className="mb-4"
        />
        {product.shortDescription && (
          <p className="text-charcoal-light mb-4">{product.shortDescription}</p>
        )}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        {product.variants.length === 0 ? (
          <PriceDisplay
            price={getDisplayPrices(Number(product.price)).price}
            compareAtPrice={getDisplayPrices(Number(product.price)).compareAtPrice ?? (product.compareAtPrice ? Number(product.compareAtPrice) : null)}
          />
        ) : null}
        <VariantSelector product={product} className="mt-4" />
        <div className="flex flex-wrap gap-3 mt-6">
          {hasPreviewPdf && (
            <PreviewViewer
              imageUrl={imageUrl}
              previewPdfUrl={product.previewPdfAsset}
              previewPageImages={product.previewPageImages ?? []}
              productTitle={product.title}
            >
              <button className="px-4 py-2 border border-border-warm rounded text-sm font-medium text-charcoal hover:bg-parchment-dark transition-colors">
                Preview score
              </button>
            </PreviewViewer>
          )}
          {product.enablePreviewAudio && product.previewAudioUrl && (
            <a
              href="#listen"
              className="px-4 py-2 border border-border-warm rounded text-sm font-medium text-charcoal hover:bg-parchment-dark transition-colors"
            >
              Listen to preview
            </a>
          )}
        </div>
        <p className="mt-4 text-sm text-charcoal-light">
          Purchase includes a single-user license.{" "}
          <Link href="/policies/licensing" className="text-honey hover:text-honey-dark underline underline-offset-2">
            See Licensing Terms
          </Link>{" "}
          for details.
        </p>
      </div>
    </div>
  );
}
