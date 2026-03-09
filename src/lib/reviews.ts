import { prisma } from "@/lib/prisma";

export async function getReviewStats(productId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });
    const count = reviews.length;
    const average =
      count > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10
          ) / 10
        : 0;
    return { average, count };
  } catch {
    return { average: 0, count: 0 };
  }
}

export async function getReviewStatsForProducts(
  productIds: string[]
): Promise<Record<string, { average: number; count: number }>> {
  if (productIds.length === 0) return {};
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: { in: productIds } },
      select: { productId: true, rating: true },
    });
    const byProduct: Record<string, { sum: number; count: number }> = {};
    for (const id of productIds) {
      byProduct[id] = { sum: 0, count: 0 };
    }
    for (const r of reviews) {
      byProduct[r.productId].sum += r.rating;
      byProduct[r.productId].count += 1;
    }
    const result: Record<string, { average: number; count: number }> = {};
    for (const [id, { sum, count }] of Object.entries(byProduct)) {
      result[id] = {
        average: count > 0 ? Math.round((sum / count) * 10) / 10 : 0,
        count,
      };
    }
    return result;
  } catch {
    return Object.fromEntries(
      productIds.map((id) => [id, { average: 0, count: 0 }])
    );
  }
}
