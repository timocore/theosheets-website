"use client";

import { CatalogAudioProvider } from "@/contexts/CatalogAudioContext";
import { ProductCard } from "./ProductCard";

interface Product {
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
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <CatalogAudioProvider>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </CatalogAudioProvider>
  );
}
