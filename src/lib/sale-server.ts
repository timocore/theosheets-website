import { prisma } from "@/lib/prisma";

const KEY = "sale_percent";

/**
 * Server-side: get sale percent from database.
 * Falls back to env var if DB has no value.
 */
export async function getSalePercentFromDb(): Promise<number> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: KEY },
  });
  if (setting) {
    const n = parseInt(setting.value, 10);
    if (!isNaN(n) && n >= 0) return n;
  }
  return Number(process.env.NEXT_PUBLIC_SALE_PERCENT) || 0;
}
