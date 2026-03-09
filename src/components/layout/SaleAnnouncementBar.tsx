"use client";

import Link from "next/link";
import { useSaleStore } from "@/store/sale-store";

export function SaleAnnouncementBar() {
  const salePercent = useSaleStore((s) => s.salePercent);

  if (salePercent <= 0) return null;

  const message = `🎵 ${salePercent}% OFF store-wide — Premium sheet music at unbeatable prices. Shop now!`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-honey via-honey-light to-honey-dark bg-[length:200%_100%] animate-sale-bar">
      <Link
        href="/sheet-music"
        className="block py-2 text-center text-charcoal-dark font-medium text-sm"
      >
        <span className="inline-block animate-sale-marquee whitespace-nowrap">
          {message} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {message} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {message}
        </span>
      </Link>
    </div>
  );
}
