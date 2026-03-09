"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { getSalePrice } from "@/lib/sale";
import { useSaleStore } from "@/store/sale-store";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  useSaleStore((s) => s.salePercent);
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-charcoal/20 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 w-full max-w-sm h-full bg-parchment border-l border-border-warm shadow-xl z-50 flex flex-col"
        role="dialog"
        aria-label="Cart"
      >
        <div className="flex items-center justify-between p-4 border-b border-border-warm">
          <h2 className="font-serif text-lg text-charcoal">Cart</h2>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-light hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-charcoal-light text-sm">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={`${item.productId}-${item.variantKey}`} className="flex gap-3 text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal truncate">
                      {item.productTitle ?? "Item"}
                    </p>
                    {item.variantName && (
                      <p className="text-charcoal-light text-xs">{item.variantName}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variantKey, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center border border-border-warm rounded hover:bg-parchment-dark"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variantKey, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center border border-border-warm rounded hover:bg-parchment-dark"
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
                      className="text-charcoal-light hover:text-red-600 text-xs mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-4 border-t border-border-warm">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-charcoal-light">Subtotal</span>
              <span className="font-medium text-charcoal">${subtotal().toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full text-center bg-honey hover:bg-honey-light text-charcoal-dark font-medium py-2.5 rounded transition-colors"
            >
              View cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
