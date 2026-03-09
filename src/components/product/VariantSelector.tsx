"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { CTAButton } from "@/components/shared/CTAButton";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { getDisplayPrices, getSalePrice } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";

const VARIANT_SPECS: Record<string, string> = {
  pdf: "PDF score only",
  accompaniment: "PDF score + accompaniment track",
  multitrack: "PDF score + multitrack files",
  bundle: "PDF score + accompaniment track + multitracks",
  mp3: "Standalone MP3 file",
};

interface VariantSelectorProps {
  product: {
    id: string;
    slug: string;
    title: string;
    variants: { key: string; name: string; price: number }[];
    compareAtPrice?: number | null;
  };
  className?: string;
}

export function VariantSelector({ product, className }: VariantSelectorProps) {
  useSaleStore((s) => s.salePercent);
  const [selectedKey, setSelectedKey] = useState<string | null>(
    product.variants[0]?.key ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = product.variants.find((v) => v.key === selectedKey);

  function handleAddToCart() {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      variantKey: selectedVariant.key,
      variantName: selectedVariant.name,
      unitPrice: Number(selectedVariant.price),
      productTitle: product.title,
      productSlug: product.slug,
      quantity,
    });
  }

  if (product.variants.length === 0) return null;

  return (
    <div className={className}>
      <PriceDisplay
        price={getDisplayPrices(Number(selectedVariant?.price ?? product.variants[0].price)).price}
        compareAtPrice={
          getDisplayPrices(Number(selectedVariant?.price ?? product.variants[0].price)).compareAtPrice ??
          (product.compareAtPrice != null ? Number(product.compareAtPrice) : null)
        }
        className="mb-4"
      />
      {product.variants.length > 1 ? (
        <div className="space-y-2">
          <p className="text-sm text-charcoal-light">Format</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const spec = VARIANT_SPECS[v.key];
              return (
                <div key={v.key} className="relative flex items-start gap-0">
                  {spec && (
                    <span
                      className="group/spec absolute -top-0.5 -right-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border-warm bg-parchment-light text-charcoal-light text-[10px] font-medium hover:border-charcoal-light hover:text-charcoal cursor-help"
                      aria-label={`${v.name}: ${spec}`}
                    >
                      ?
                      <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-charcoal px-2 py-1 text-xs text-parchment opacity-0 shadow-lg transition-opacity duration-150 group-hover/spec:opacity-100">
                        What it contains: {spec}
                      </span>
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedKey(v.key)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      selectedKey === v.key
                        ? "bg-honey text-charcoal-dark"
                        : "border border-border-warm text-charcoal hover:bg-parchment-dark"
                    }`}
                  >
                    {v.name} — ${getSalePrice(Number(v.price)).toFixed(2)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-sm text-charcoal-light">
          {product.variants[0].name} — ${getSalePrice(Number(product.variants[0].price)).toFixed(2)}
        </p>
      )}
      <div className="flex items-center gap-4 mt-4">
        {product.variants.length > 1 && (
          <div className="flex items-center gap-2">
            <label htmlFor="qty" className="text-sm text-charcoal-light">
              Qty
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-16 px-2 py-1.5 border border-border-warm rounded text-center"
            />
          </div>
        )}
        <CTAButton
          onClick={handleAddToCart}
          disabled={!selectedVariant}
          className="shrink-0"
        >
          Add to cart
        </CTAButton>
      </div>
    </div>
  );
}
