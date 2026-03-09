"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { getSalePrice } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";

export function CheckoutSummary() {
  useSaleStore((s) => s.salePercent);
  const { items, subtotal } = useCartStore();
  const taxAmount = 0;
  const total = subtotal() + taxAmount;

  if (items.length === 0) {
    return (
      <div className="lg:sticky lg:top-24 p-4 border border-border-warm rounded bg-parchment-light">
        <h3 className="font-serif text-lg text-charcoal mb-4">Order summary</h3>
        <p className="text-charcoal-light text-sm">Your cart is empty.</p>
        <Link
          href="/sheet-music"
          className="mt-4 block text-center text-honey hover:text-honey-dark font-medium text-sm"
        >
          Browse sheet music
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24 p-4 border border-border-warm rounded bg-parchment-light">
      <h3 className="font-serif text-lg text-charcoal mb-4">Order summary</h3>
      <ul className="space-y-2 mb-4">
        {items.map((item) => (
          <li key={`${item.productId}-${item.variantKey}`} className="flex justify-between text-sm">
            <span className="text-charcoal truncate">
              {item.quantity}× {item.productTitle ?? "Item"}
            </span>
            <span className="text-charcoal-light shrink-0 ml-2">
              ${(getSalePrice(item.unitPrice) * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border-warm pt-4 space-y-1">
        <div className="flex justify-between text-sm text-charcoal-light">
          <span>Subtotal</span>
          <span>${subtotal().toFixed(2)}</span>
        </div>
        {taxAmount > 0 && (
          <div className="flex justify-between text-sm text-charcoal-light">
            <span>Tax</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-medium text-charcoal pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
