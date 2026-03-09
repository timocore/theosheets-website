import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const instrument = searchParams.get("instrument");
    const difficulty = searchParams.get("difficulty");
    const mood = searchParams.get("mood");
    const collection = searchParams.get("collection");
    const sort = searchParams.get("sort") ?? "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
    const offset = (page - 1) * limit;

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

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        include: { variants: { orderBy: { sortOrder: "asc" } } },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
