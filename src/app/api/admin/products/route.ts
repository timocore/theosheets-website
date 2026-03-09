import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(
    products.map((p) => ({
      ...p,
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      variants: p.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    }))
  );
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      tags = [],
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
      status = "DRAFT",
      featured = false,
      sortOrder = 0,
      enablePreviewAudio = false,
      enableStandaloneMp3 = false,
      enableAccompaniment = false,
      enableMultitrack = false,
      availableVariants = ["pdf"],
      bundleDefinitions,
      seoTitle,
      seoDescription,
      adminNotes,
      internalName,
      variants,
    } = body;

    if (!sku || !slug || !title || price == null) {
      return NextResponse.json(
        { error: "sku, slug, title, and price are required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        sku,
        slug,
        title,
        shortDescription: shortDescription || null,
        longDescription: longDescription || null,
        aboutThePiece: aboutThePiece || null,
        whatBuyersShouldKnow: whatBuyersShouldKnow || null,
        composer: composer || null,
        instrument: instrument || null,
        difficulty: difficulty || null,
        mood: mood || null,
        category: category || null,
        collection: collection || null,
        tags: Array.isArray(tags) ? tags : [],
        durationSeconds: durationSeconds ?? null,
        pageCount: pageCount ?? null,
        format: format || null,
        productImage: productImage || null,
        coverImage: coverImage || null,
        galleryImages: [],
        previewPageImages: [],
        previewPdfAsset: previewPdfAsset || null,
        previewAudioUrl: previewAudioUrl || null,
        fullPdfFile: fullPdfFile || null,
        accompanimentFile: accompanimentFile || null,
        multitrackFile: multitrackFile || null,
        standaloneMp3File: standaloneMp3File || null,
        price,
        compareAtPrice: compareAtPrice ?? null,
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        featured: !!featured,
        sortOrder: sortOrder ?? 0,
        enablePreviewAudio: !!enablePreviewAudio,
        enableStandaloneMp3: !!enableStandaloneMp3,
        enableAccompaniment: !!enableAccompaniment,
        enableMultitrack: !!enableMultitrack,
        availableVariants: Array.isArray(availableVariants) ? availableVariants : ["pdf"],
        bundleDefinitions: bundleDefinitions ?? undefined,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        relatedProductIds: [],
        adminNotes: adminNotes || null,
        internalName: internalName || null,
      },
    });

    if (variants?.length) {
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            key: v.key,
            name: v.name,
            price: v.price,
            sortOrder: i,
          },
        });
      }
    } else {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          key: "pdf",
          name: "PDF Score",
          price: product.price,
          sortOrder: 0,
        },
      });
    }

    return NextResponse.json({ id: product.id, slug: product.slug });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
