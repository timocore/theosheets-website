import { prisma } from "./prisma";
import { getReviewStatsForProducts } from "./reviews";

export type ProductSort = "newest" | "popular" | "price-asc" | "price-desc";

/** Serialize Prisma product for Client Components (Decimal → number, ensures plain objects) */
export function serializeProduct<T extends { price: unknown; compareAtPrice?: unknown; variants?: { price: unknown; [k: string]: unknown }[] }>(
  p: T
) {
  const obj = {
    ...p,
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice != null ? Number(p.compareAtPrice) : null,
    variants: (p.variants ?? []).map((v) => ({
      ...v,
      price: Number(v.price),
    })),
  };
  return JSON.parse(JSON.stringify(obj)) as T;
}

export interface ProductFilters {
  q?: string;
  instrument?: string;
  difficulty?: string;
  mood?: string;
  collection?: string;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const {
    q = "",
    instrument,
    difficulty,
    mood,
    collection,
    sort = "newest",
    page = 1,
    limit = 12,
  } = filters;

  const where: Record<string, unknown> = {
    status: "PUBLISHED",
    isActive: true,
  };

  if (instrument) where.instrument = instrument;
  if (difficulty) where.difficulty = difficulty;
  if (mood) where.mood = mood;
  if (collection) where.collection = collection;

  if (q.trim()) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { shortDescription: { contains: q, mode: "insensitive" } },
      { composer: { contains: q, mode: "insensitive" } },
      { instrument: { contains: q, mode: "insensitive" } },
      { mood: { contains: q, mode: "insensitive" } },
      { collection: { contains: q, mode: "insensitive" } },
      { tags: { has: q } },
    ];
  }

  const orderBy: Record<string, string> =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
        ? { price: "desc" }
        : sort === "popular"
          ? { sortOrder: "asc" }
          : { releaseDate: "desc" };

  const offset = (page - 1) * limit;

  const [rawProducts, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: { variants: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.product.count({ where }),
  ]);

  const products = rawProducts.map(serializeProduct);
  const reviewStats = await getReviewStatsForProducts(products.map((p: (typeof products)[number]) => p.id));
  const productsWithReviews = products.map((p: (typeof products)[number]) => ({
    ...p,
    reviewAverage: reviewStats[p.id]?.average ?? 0,
    reviewCount: reviewStats[p.id]?.count ?? 0,
  }));

  return {
  products: productsWithReviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getFeaturedProducts(limit = 6) {
  const rawProducts = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      isActive: true,
      featured: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });
  const products = rawProducts.map(serializeProduct);
  const reviewStats = await getReviewStatsForProducts(products.map((p: (typeof products)[number]) => p.id));
  return products.map((p: (typeof products)[number]) => ({
    ...p,
    reviewAverage: reviewStats[p.id]?.average ?? 0,
    reviewCount: reviewStats[p.id]?.count ?? 0,
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      isActive: true,
    },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });
  return product ? serializeProduct(product) : null;
}

export async function getFilterOptions() {
  const [instruments, difficulties, moods, collections] = await Promise.all([
    prisma.product.findMany({
      where: { status: "PUBLISHED", instrument: { not: null } },
      select: { instrument: true },
      distinct: ["instrument"],
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", difficulty: { not: null } },
      select: { difficulty: true },
      distinct: ["difficulty"],
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", mood: { not: null } },
      select: { mood: true },
      distinct: ["mood"],
    }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", collection: { not: null } },
      select: { collection: true },
      distinct: ["collection"],
    }),
  ]);

  return {
    instruments: instruments.map((i: (typeof instruments)[number]) => i.instrument).filter(Boolean) as string[],
    difficulties: difficulties.map((d: (typeof difficulties)[number]) => d.difficulty).filter(Boolean) as string[],
    moods: moods.map((m: (typeof moods)[number]) => m.mood).filter(Boolean) as string[],
    collections: collections.map((c: (typeof collections)[number]) => c.collection).filter(Boolean) as string[],
  };
}
