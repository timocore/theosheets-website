import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const product = await prisma.product.findFirst({
    where: { id: productId, status: "PUBLISHED", isActive: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
    },
  });

  const count = reviews.length;
  const average =
    count > 0
      ? reviews.reduce((sum: number, r: (typeof reviews)[number]) => sum + r.rating, 0) / count
      : 0;

  return NextResponse.json({
    average: Math.round(average * 10) / 10,
    count,
    reviews: reviews.map((r: (typeof reviews)[number]) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      authorName: r.user?.name ?? "Anonymous",
      createdAt: r.createdAt,
    })),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to leave a review" }, { status: 401 });
  }

  const { id: productId } = await params;
  const product = await prisma.product.findFirst({
    where: { id: productId, status: "PUBLISHED", isActive: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const body = await req.json();
  const rating = Math.min(5, Math.max(1, parseInt(String(body.rating ?? 0), 10) || 0));
  const comment = typeof body.comment === "string" ? body.comment.trim().slice(0, 2000) : null;

  const existing = await prisma.review.findFirst({
    where: { productId, userId: session.user.id },
  });
  if (existing) {
    await prisma.review.update({
      where: { id: existing.id },
      data: { rating, comment },
    });
  } else {
    await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        comment: comment || null,
      },
    });
  }

  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
  });
  const count = reviews.length;
  const average =
    count > 0 ? reviews.reduce((sum: number, r: (typeof reviews)[number]) => sum + r.rating, 0) / count : 0;

  return NextResponse.json({
    average: Math.round(average * 10) / 10,
    count,
  });
}
