import { create } from "zustand";

interface SaleState {
  salePercent: number;
  setSalePercent: (n: number) => void;
  fetchSalePercent: () => Promise<void>;
}

export const useSaleStore = create<SaleState>((set) => ({
  salePercent: 0,
  setSalePercent: (salePercent) => set({ salePercent }),
  fetchSalePercent: async () => {
    try {
      const res = await fetch("/api/settings/sale");
      const data = await res.json();
      set({ salePercent: data.salePercent ?? 0 });
    } catch {
      set({ salePercent: 0 });
    }
  },
}));
