/**
 * Store-wide sale configuration.
 * Reads from database (via API) on client, or pass salePercent on server.
 * Env NEXT_PUBLIC_SALE_PERCENT is fallback when DB has no value.
 */

function getSalePercentClient(): number {
  if (typeof window === "undefined") return 0;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useSaleStore } = require("@/store/sale-store");
    return useSaleStore.getState().salePercent;
  } catch {
    return Number(process.env.NEXT_PUBLIC_SALE_PERCENT) || 0;
  }
}

/**
 * Returns the sale price (discounted) when sale is active, otherwise the original price.
 * On client: reads salePercent from store. On server: pass salePercent from getSalePercentFromDb().
 */
export function getSalePrice(price: number, salePercent?: number): number {
  const percent = salePercent ?? getSalePercentClient();
  if (percent <= 0) return price;
  return Math.round(price * (1 - percent / 100) * 100) / 100;
}

/**
 * For display: when sale is active, returns { price: salePrice, compareAtPrice: originalPrice }.
 * Otherwise returns { price: originalPrice, compareAtPrice: null }.
 */
export function getDisplayPrices(price: number, salePercent?: number): {
  price: number;
  compareAtPrice: number | null;
} {
  const percent = salePercent ?? getSalePercentClient();
  if (percent <= 0) {
    return { price, compareAtPrice: null };
  }
  return {
    price: getSalePrice(price, percent),
    compareAtPrice: price,
  };
}

export function isSaleActive(salePercent?: number): boolean {
  const percent = salePercent ?? getSalePercentClient();
  return percent > 0;
}
