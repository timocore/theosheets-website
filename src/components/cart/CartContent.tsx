"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { CTAButton } from "@/components/shared/CTAButton";
import { getSalePrice } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";

export function CartContent() {
  useSaleStore((s) => s.salePercent);
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-light mb-6">Your cart is empty.</p>
        <CTAButton href="/sheet-music">Browse sheet music</CTAButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.variantKey}`}
            className="flex gap-4 py-4 border-b border-border-warm"
          >
            <div className="flex-1 min-w-0">
              <Link
                href={`/sheet-music/${item.productSlug ?? item.productId}`}
                className="font-medium text-charcoal hover:text-honey transition-colors"
              >
                {item.productTitle ?? "Item"}
              </Link>
              {item.variantName && (
                <p className="text-sm text-charcoal-light mt-0.5">
                  {item.variantName}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.variantKey, item.quantity - 1)
                  }
                  className="w-8 h-8 flex items-center justify-center border border-border-warm rounded hover:bg-parchment-dark"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.variantKey, item.quantity + 1)
                  }
                  className="w-8 h-8 flex items-center justify-center border border-border-warm rounded hover:bg-parchment-dark"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-charcoal">
                ${(getSalePrice(item.unitPrice) * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.productId, item.variantKey)}
                className="text-sm text-charcoal-light hover:text-red-600 mt-1"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-border-warm pt-6">
        <div className="flex justify-between text-lg mb-6">
          <span className="text-charcoal-light">Subtotal</span>
          <span className="font-medium text-charcoal">
            ${subtotal().toFixed(2)}
          </span>
        </div>
        <CTAButton href="/checkout" size="lg" className="w-full justify-center">
          Proceed to checkout
        </CTAButton>
      </div>
    </div>
  );
}
