import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSalePrice } from "@/lib/sale";

export interface CartItem {
  productId: string;
  variantKey: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  productTitle?: string;
  productSlug?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantKey: string) => void;
  updateQuantity: (productId: string, variantKey: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantKey === item.variantKey
          );
          const qty = item.quantity ?? 1;
          if (existing >= 0) {
            const next = [...state.items];
            next[existing].quantity += qty;
            return { items: next };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
          };
        });
      },
      removeItem: (productId, variantKey) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantKey === variantKey)
          ),
        }));
      },
      updateQuantity: (productId, variantKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantKey);
          return;
        }
        set((state) => {
          const next = state.items.map((i) =>
            i.productId === productId && i.variantKey === variantKey
              ? { ...i, quantity }
              : i
          );
          return { items: next };
        });
      },
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + getSalePrice(i.unitPrice) * i.quantity, 0),
    }),
    { name: "theosheets-cart" }
  )
);
