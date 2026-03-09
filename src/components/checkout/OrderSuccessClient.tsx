"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    const status = searchParams.get("redirect_status");
    if (status === "succeeded") {
      clearCart();
    }
  }, [searchParams, clearCart]);

  return null;
}
