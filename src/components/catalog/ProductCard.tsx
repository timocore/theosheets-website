"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ProductImage } from "@/components/shared/ProductImage";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ReviewSummary } from "@/components/shared/ReviewSummary";
import { TagPill } from "@/components/shared/TagPill";
import { useCatalogAudio } from "@/contexts/CatalogAudioContext";
import {
  getProductPlaceholderImage,
  getProxiedImageUrl,
  isValidImageUrl,
} from "@/lib/placeholders";
import { getDisplayPrices } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    shortDescription?: string | null;
    tags: string[];
    productImage?: string | null;
    coverImage?: string | null;
    compareAtPrice?: number | null;
    enablePreviewAudio?: boolean;
    previewAudioUrl?: string | null;
    variants: { key: string; price: number }[];
    reviewAverage?: number;
    reviewCount?: number;
  };
}

function getMinPrice(variants: { price: number }[]): number {
  if (variants.length === 0) return 0;
  return Math.min(...variants.map((v) => Number(v.price)));
}

export function ProductCard({ product }: ProductCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { playingProductId, setPlayingProductId } = useCatalogAudio();
  useSaleStore((s) => s.salePercent);
  const minPrice = getMinPrice(product.variants);
  const { price: displayPrice, compareAtPrice: displayCompareAt } = getDisplayPrices(minPrice);

  // Pause when another product starts playing
  useEffect(() => {
    if (playingProductId !== null && playingProductId !== product.id && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [playingProductId, product.id, playing]);
  const rawImage = product.productImage || product.coverImage;
  const imageUrl = getProxiedImageUrl(
    isValidImageUrl(rawImage) ? rawImage! : getProductPlaceholderImage(product.slug)
  );
  const hasPreview = !!(product.enablePreviewAudio && product.previewAudioUrl);
  const audioUrl = hasPreview ? getProxiedImageUrl(product.previewAudioUrl!) : null;

  function togglePlay(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlayingProductId(null);
    } else {
      setPlayingProductId(product.id);
      audio.play();
    }
    setPlaying(!playing);
  }

  function handleAudioEnded() {
    setPlaying(false);
    setPlayingProductId(null);
  }

  return (
    <article className="group">
      <Link href={`/sheet-music/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-parchment-dark rounded overflow-hidden mb-3">
          <ProductImage
            src={imageUrl}
            alt={product.title}
            fill
            fallbackSlug={product.slug}
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasPreview && audioUrl && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-colors duration-200 ${
                playing ? "bg-charcoal/50 pointer-events-auto" : "bg-charcoal/0 pointer-events-none group-hover:bg-charcoal/50 group-hover:pointer-events-auto"
              }`}
            >
              <button
                type="button"
                onClick={togglePlay}
                className={`w-14 h-14 rounded-full bg-honey/90 hover:bg-honey text-charcoal-dark flex items-center justify-center transition-opacity duration-200 shadow-lg pointer-events-auto ${
                  playing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                aria-label={playing ? "Pause" : "Play preview"}
              >
                {playing ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
        <h3 className="font-serif text-lg text-charcoal group-hover:text-honey transition-colors line-clamp-2">
          {product.title}
        </h3>
      </Link>
      {(product.reviewCount ?? 0) > 0 && (
        <ReviewSummary
          average={product.reviewAverage}
          count={product.reviewCount}
          className="mt-1"
        />
      )}
      {hasPreview && audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          preload="none"
          className="hidden"
        />
      )}
      {product.shortDescription && (
        <p className="text-sm text-charcoal-light mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {product.tags.slice(0, 3).map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>
      <div className="mt-3">
        <PriceDisplay
          price={displayPrice}
          compareAtPrice={displayCompareAt ?? (product.compareAtPrice ? Number(product.compareAtPrice) : null)}
          prefix={product.variants.length > 1 ? "From" : undefined}
        />
      </div>
    </article>
  );
}
