"use client";

import Link from "next/link";
import { ProductImage } from "@/components/shared/ProductImage";
import {
  getProductPlaceholderImage,
  getProxiedImageUrl,
  isValidImageUrl,
} from "@/lib/placeholders";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { getDisplayPrices } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";

interface RelatedProductsProps {
  products: {
    id: string;
    slug: string;
    title: string;
    productImage?: string | null;
    coverImage?: string | null;
    variants: { price: number }[];
  }[];
}

function getMinPrice(variants: { price: number }[]): number {
  if (variants.length === 0) return 0;
  return Math.min(...variants.map((v) => Number(v.price)));
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  useSaleStore((s) => s.salePercent);
  if (products.length === 0) return null;

  return (
    <section>
      <SerifHeading as="h2" className="mb-6">
        Related scores
      </SerifHeading>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/sheet-music/${product.slug}`} className="group block">
              <div className="aspect-[3/4] bg-parchment-dark rounded overflow-hidden mb-2 relative">
                <ProductImage
                  src={getProxiedImageUrl(
                    isValidImageUrl(product.productImage || product.coverImage)
                      ? (product.productImage || product.coverImage)!
                      : getProductPlaceholderImage(product.slug)
                  )}
                  alt={product.title}
                  fill
                  fallbackSlug={product.slug}
                  className="object-cover group-hover:scale-[1.02] transition-transform"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-serif text-lg text-charcoal group-hover:text-honey transition-colors">
                {product.title}
              </h3>
              <PriceDisplay
                price={getDisplayPrices(getMinPrice(product.variants)).price}
                compareAtPrice={getDisplayPrices(getMinPrice(product.variants)).compareAtPrice}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
