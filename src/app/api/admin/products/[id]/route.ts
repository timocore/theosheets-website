import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    variants: product.variants.map((v: (typeof product.variants)[number]) => ({
      ...v,
      price: Number(v.price),
    })),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const {
      sku,
      slug,
      title,
      shortDescription,
      longDescription,
      aboutThePiece,
      whatBuyersShouldKnow,
      composer,
      instrument,
      difficulty,
      mood,
      category,
      collection,
      tags,
      durationSeconds,
      pageCount,
      format,
      productImage,
      coverImage,
      previewPdfAsset,
      previewAudioUrl,
      fullPdfFile,
      accompanimentFile,
      multitrackFile,
      standaloneMp3File,
      price,
      compareAtPrice,
      status,
      featured,
      sortOrder,
      enablePreviewAudio,
      enableStandaloneMp3,
      enableAccompaniment,
      enableMultitrack,
      availableVariants,
      bundleDefinitions,
      seoTitle,
      seoDescription,
      adminNotes,
      internalName,
      variants,
    } = body;

    const updateData: Record<string, unknown> = {};
    if (sku != null) updateData.sku = sku;
    if (slug != null) updateData.slug = slug;
    if (title != null) updateData.title = title;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription || null;
    if (longDescription !== undefined) updateData.longDescription = longDescription || null;
    if (aboutThePiece !== undefined) updateData.aboutThePiece = aboutThePiece || null;
    if (whatBuyersShouldKnow !== undefined) updateData.whatBuyersShouldKnow = whatBuyersShouldKnow || null;
    if (composer !== undefined) updateData.composer = composer || null;
    if (instrument !== undefined) updateData.instrument = instrument || null;
    if (difficulty !== undefined) updateData.difficulty = difficulty || null;
    if (mood !== undefined) updateData.mood = mood || null;
    if (category !== undefined) updateData.category = category || null;
    if (collection !== undefined) updateData.collection = collection || null;
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : product.tags;
    if (durationSeconds !== undefined) updateData.durationSeconds = durationSeconds ?? null;
    if (pageCount !== undefined) updateData.pageCount = pageCount ?? null;
    if (format !== undefined) updateData.format = format || null;
    if (productImage !== undefined) updateData.productImage = productImage || null;
    if (coverImage !== undefined) updateData.coverImage = coverImage || null;
    if (previewPdfAsset !== undefined) updateData.previewPdfAsset = previewPdfAsset || null;
    if (previewAudioUrl !== undefined) updateData.previewAudioUrl = previewAudioUrl || null;
    if (fullPdfFile !== undefined) updateData.fullPdfFile = fullPdfFile || null;
    if (accompanimentFile !== undefined) updateData.accompanimentFile = accompanimentFile || null;
    if (multitrackFile !== undefined) updateData.multitrackFile = multitrackFile || null;
    if (standaloneMp3File !== undefined) updateData.standaloneMp3File = standaloneMp3File || null;
    if (price != null) updateData.price = price;
    if (compareAtPrice !== undefined) updateData.compareAtPrice = compareAtPrice ?? null;
    if (status !== undefined) updateData.status = status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    if (featured !== undefined) updateData.featured = !!featured;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder ?? 0;
    if (enablePreviewAudio !== undefined) updateData.enablePreviewAudio = !!enablePreviewAudio;
    if (enableStandaloneMp3 !== undefined) updateData.enableStandaloneMp3 = !!enableStandaloneMp3;
    if (enableAccompaniment !== undefined) updateData.enableAccompaniment = !!enableAccompaniment;
    if (enableMultitrack !== undefined) updateData.enableMultitrack = !!enableMultitrack;
    if (availableVariants !== undefined) updateData.availableVariants = Array.isArray(availableVariants) ? availableVariants : product.availableVariants;
    if (bundleDefinitions !== undefined) updateData.bundleDefinitions = bundleDefinitions;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle || null;
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription || null;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes || null;
    if (internalName !== undefined) updateData.internalName = internalName || null;

    await prisma.product.update({
      where: { id },
      data: updateData,
    });

    if (variants && Array.isArray(variants)) {
      await prisma.productVariant.deleteMany({ where: { productId: id } });
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        await prisma.productVariant.create({
          data: {
            productId: id,
            key: v.key,
            name: v.name,
            price: v.price,
            sortOrder: i,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
