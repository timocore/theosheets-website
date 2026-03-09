import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProducts = [
  {
    sku: "TS-DREAM-001",
    slug: "dreamscapes",
    title: "Dreamscapes",
    shortDescription: "A contemplative piano piece with flowing arpeggios and gentle melodies.",
    longDescription:
      "Dreamscapes invites you into a world of quiet reflection. Written for intermediate pianists, this piece features flowing arpeggios, gentle melodic lines, and a warm harmonic palette that evokes twilight and reverie.",
    aboutThePiece:
      "Composed during a season of rest, Dreamscapes captures the feeling of drifting between wakefulness and sleep—those moments when imagination takes flight.",
    whatBuyersShouldKnow:
      "Intermediate difficulty. Includes PDF score and optional accompaniment track. Approximately 4 minutes.",
    composer: "Theo Timoc",
    instrument: "Piano",
    difficulty: "Intermediate",
    mood: "Contemplative",
    category: "Original",
    collection: "Quiet Moments",
    tags: ["piano", "contemplative", "arpeggios", "original"],
    durationSeconds: 240,
    pageCount: 6,
    format: "PDF",
    price: 4.99,
    compareAtPrice: 6.99,
    status: "PUBLISHED" as const,
    featured: true,
    sortOrder: 0,
    enablePreviewAudio: true,
    enableAccompaniment: true,
    enableMultitrack: false,
    enableStandaloneMp3: false,
    availableVariants: ["pdf", "accompaniment", "bundle"],
    bundleDefinitions: { bundle: ["pdf", "accompaniment"] },
    seoTitle: "Dreamscapes Sheet Music by Theo Timoc | TheoSheets",
    seoDescription:
      "Download Dreamscapes sheet music for piano. Contemplative, flowing. Includes PDF and accompaniment. Instant digital delivery from TheoSheets.",
    relatedProductIds: [],
    productImage: "https://placehold.co/400x533/f5f0e8/3d3630?text=Dreamscapes",
  },
  {
    sku: "TS-AUTUMN-001",
    slug: "autumn-light",
    title: "Autumn Light",
    shortDescription: "Warm, nostalgic piano music perfect for reflective moments.",
    longDescription:
      "Autumn Light paints a picture of golden afternoons and falling leaves. Its warm harmonies and lyrical melody make it ideal for worship settings or personal reflection.",
    aboutThePiece:
      "Inspired by the way light changes in autumn—softer, warmer, more golden. This piece seeks to capture that quality in sound.",
    whatBuyersShouldKnow:
      "Easy to intermediate. PDF score with optional accompaniment. Great for worship or recital.",
    composer: "Theo Timoc",
    instrument: "Piano",
    difficulty: "Easy",
    mood: "Warm",
    category: "Worship",
    collection: "Seasonal",
    tags: ["piano", "worship", "autumn", "warm"],
    durationSeconds: 210,
    pageCount: 5,
    format: "PDF",
    price: 3.99,
    status: "PUBLISHED" as const,
    featured: true,
    sortOrder: 1,
    enablePreviewAudio: true,
    enableAccompaniment: true,
    enableMultitrack: false,
    enableStandaloneMp3: false,
    availableVariants: ["pdf", "accompaniment", "bundle"],
    bundleDefinitions: { bundle: ["pdf", "accompaniment"] },
    seoTitle: "Autumn Light Sheet Music by Theo Timoc | TheoSheets",
    seoDescription:
      "Download Autumn Light sheet music for piano. Warm, nostalgic. Includes PDF and accompaniment. Instant digital delivery from TheoSheets.",
    relatedProductIds: [],
    productImage: "https://placehold.co/400x533/f5f0e8/3d3630?text=Autumn+Light",
  },
  {
    sku: "TS-STILL-001",
    slug: "still-waters",
    title: "Still Waters",
    shortDescription: "A peaceful piano meditation with sparse, open textures.",
    longDescription:
      "Still Waters draws from Psalm 23—a quiet, spacious piece that leaves room for breath and reflection. Minimalist in approach, rich in atmosphere.",
    aboutThePiece:
      "Written as a response to Psalm 23, Still Waters aims to evoke the peace of green pastures and quiet streams.",
    whatBuyersShouldKnow:
      "Intermediate. PDF score. Suitable for preludes, offertories, or personal worship.",
    composer: "Theo Timoc",
    instrument: "Piano",
    difficulty: "Intermediate",
    mood: "Peaceful",
    category: "Worship",
    collection: "Psalm Settings",
    tags: ["piano", "worship", "meditation", "peaceful"],
    durationSeconds: 180,
    pageCount: 4,
    format: "PDF",
    price: 3.49,
    status: "PUBLISHED" as const,
    featured: false,
    sortOrder: 2,
    enablePreviewAudio: true,
    enableAccompaniment: false,
    enableMultitrack: false,
    enableStandaloneMp3: false,
    availableVariants: ["pdf"],
    bundleDefinitions: null,
    seoTitle: "Still Waters Sheet Music by Theo Timoc | TheoSheets",
    seoDescription:
      "Download Still Waters sheet music for piano. Peaceful, meditative. PDF format. Instant digital delivery from TheoSheets.",
    relatedProductIds: [],
    productImage: "https://placehold.co/400x533/f5f0e8/3d3630?text=Still+Waters",
  },
  {
    sku: "TS-NIGHT-001",
    slug: "night-window",
    title: "Night Window",
    shortDescription: "Cinematic piano with subtle jazz influences.",
    longDescription:
      "Night Window imagines the view from a city apartment at night—lights, distant sounds, a sense of longing and possibility. The piece blends cinematic textures with subtle jazz harmony.",
    aboutThePiece:
      "A late-night composition that captures the feeling of looking out at a cityscape, alone but not lonely.",
    whatBuyersShouldKnow:
      "Intermediate to advanced. PDF, accompaniment, and multitrack pack available.",
    composer: "Theo Timoc",
    instrument: "Piano",
    difficulty: "Advanced",
    mood: "Cinematic",
    category: "Original",
    collection: "Urban Sketches",
    tags: ["piano", "cinematic", "jazz", "nocturne"],
    durationSeconds: 300,
    pageCount: 8,
    format: "PDF",
    price: 5.99,
    compareAtPrice: 7.99,
    status: "PUBLISHED" as const,
    featured: true,
    sortOrder: 3,
    enablePreviewAudio: true,
    enableAccompaniment: true,
    enableMultitrack: true,
    enableStandaloneMp3: true,
    availableVariants: ["pdf", "accompaniment", "multitrack", "bundle"],
    bundleDefinitions: {
      bundle: ["pdf", "accompaniment", "multitrack"],
    },
    seoTitle: "Night Window Sheet Music by Theo Timoc | TheoSheets",
    seoDescription:
      "Download Night Window sheet music for piano. Cinematic, jazz-influenced. Includes PDF, accompaniment, multitracks. Instant digital delivery from TheoSheets.",
    relatedProductIds: [],
    productImage: "https://placehold.co/400x533/f5f0e8/3d3630?text=Night+Window",
  },
  {
    sku: "TS-GRACE-001",
    slug: "strings-of-grace",
    title: "Strings of Grace",
    shortDescription: "A worship ballad with piano and string accompaniment.",
    longDescription:
      "Strings of Grace is a worship ballad designed for congregational singing or solo performance. The piano part supports a lyrical melody that soars over rich string textures.",
    aboutThePiece:
      "Born from a season of gratitude, this piece expresses thankfulness through melody and harmony.",
    whatBuyersShouldKnow:
      "Intermediate. PDF and full multitrack pack for production use.",
    composer: "Theo Timoc",
    instrument: "Piano",
    difficulty: "Intermediate",
    mood: "Worship",
    category: "Worship",
    collection: "Ballads",
    tags: ["piano", "worship", "ballad", "strings"],
    durationSeconds: 270,
    pageCount: 7,
    format: "PDF",
    price: 4.49,
    status: "PUBLISHED" as const,
    featured: false,
    sortOrder: 4,
    enablePreviewAudio: true,
    enableAccompaniment: true,
    enableMultitrack: true,
    enableStandaloneMp3: false,
    availableVariants: ["pdf", "accompaniment", "multitrack", "bundle"],
    bundleDefinitions: {
      bundle: ["pdf", "accompaniment", "multitrack"],
    },
    seoTitle: "Strings of Grace Sheet Music by Theo Timoc | TheoSheets",
    seoDescription:
      "Download Strings of Grace sheet music for piano. Worship ballad. Includes PDF, accompaniment, multitracks. Instant digital delivery from TheoSheets.",
    relatedProductIds: [],
    productImage: "https://placehold.co/400x533/f5f0e8/3d3630?text=Strings+of+Grace",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of sampleProducts) {
    const { relatedProductIds, bundleDefinitions, ...data } = product;
    const createData = {
      ...data,
      price: data.price,
      compareAtPrice: data.compareAtPrice ?? null,
      releaseDate: new Date(),
      galleryImages: [],
      previewPageImages: [],
      relatedProductIds: relatedProductIds ?? [],
      bundleDefinitions: bundleDefinitions ?? Prisma.JsonNull,
    };
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: createData,
      update: {
        ...data,
        price: data.price,
        compareAtPrice: data.compareAtPrice ?? null,
        galleryImages: [],
        previewPageImages: [],
        relatedProductIds: relatedProductIds ?? [],
        bundleDefinitions: bundleDefinitions ?? Prisma.JsonNull,
      },
    });
  }

  // Create variants for each product
  const products = await prisma.product.findMany();
  const variantNames: Record<string, string> = {
    pdf: "PDF Score",
    accompaniment: "Accompaniment Track Pack",
    multitrack: "Multitrack Pack",
    bundle: "Complete Bundle",
    mp3: "Standalone MP3",
  };

  for (const product of products) {
    const existing = await prisma.productVariant.findMany({
      where: { productId: product.id },
    });
    if (existing.length > 0) continue;

    const variants = product.availableVariants as string[];
    let sortOrder = 0;
    for (const key of variants) {
      const basePrice = Number(product.price);
      const price = key === "bundle" ? basePrice * 0.85 : basePrice;
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          key,
          name: variantNames[key] ?? key,
          price,
          sortOrder: sortOrder++,
        },
      });
    }
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
