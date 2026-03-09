"use client";

import { useEffect } from "react";
import { useSaleStore } from "@/store/sale-store";

export function SaleProvider({ children }: { children: React.ReactNode }) {
  const fetchSalePercent = useSaleStore((s) => s.fetchSalePercent);

  useEffect(() => {
    fetchSalePercent();
  }, [fetchSalePercent]);

  return <>{children}</>;
}
