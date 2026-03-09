import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";
import { getReviewStats } from "@/lib/reviews";
import { getProxiedImageUrl } from "@/lib/placeholders";
import { ProductHero } from "@/components/product/ProductHero";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { PreviewAudioPlayer } from "@/components/product/PreviewAudioPlayer";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { SerifHeading } from "@/components/shared/SerifHeading";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.seoTitle ?? `${product.title} Sheet Music by Theo Timoc | TheoSheets`,
    description:
      product.seoDescription ??
      `Download ${product.title} sheet music for ${product.instrument ?? "piano"}. ${product.mood ?? ""}. Includes ${product.format ?? "PDF"}. Instant digital delivery from TheoSheets.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Related products: prioritize same instrument, then mood, then collection
  const [byInstrument, byMood, byCollection] = await Promise.all([
    product.instrument ? getProducts({ limit: 6, instrument: product.instrument }) : { products: [] },
    product.mood ? getProducts({ limit: 6, mood: product.mood }) : { products: [] },
    product.collection ? getProducts({ limit: 6, collection: product.collection }) : { products: [] },
  ]);
  type ProductItem = (typeof byInstrument.products)[number] | (typeof byMood.products)[number] | (typeof byCollection.products)[number];
  const combined = [
    ...byInstrument.products,
    ...byMood.products.filter((p: ProductItem) => !byInstrument.products.some((x: ProductItem) => x.id === p.id)),
    ...byCollection.products.filter(
      (p: ProductItem) =>
        !byInstrument.products.some((x: ProductItem) => x.id === p.id) &&
        !byMood.products.some((x: ProductItem) => x.id === p.id)
    ),
  ];
  const relatedProducts = combined.filter((p: ProductItem) => p.id !== product.id).slice(0, 6);
  const reviewStats = await getReviewStats(product.id);

  const details = [
    product.composer && { label: "Composer", value: product.composer },
    product.format && { label: "Format", value: product.format },
    product.instrument && { label: "Instrument", value: product.instrument },
    product.difficulty && { label: "Difficulty", value: product.difficulty },
    product.mood && { label: "Mood", value: product.mood },
    product.durationSeconds && {
      label: "Duration",
      value: `${Math.floor(product.durationSeconds / 60)}:${String(product.durationSeconds % 60).padStart(2, "0")}`,
    },
    product.pageCount && { label: "Pages", value: String(product.pageCount) },
    { label: "Delivery", value: "Instant digital download" },
    { label: "License", value: "Personal & congregational use" },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <ProductHero product={product as unknown as Parameters<typeof ProductHero>[0]["product"]} reviewStats={reviewStats} />

      {product.enablePreviewAudio && product.previewAudioUrl && (
        <div className="mt-12">
          <PreviewAudioPlayer
            src={getProxiedImageUrl(product.previewAudioUrl)}
            title="Full-length preview (stream only)"
          />
        </div>
      )}

      {product.aboutThePiece && (
        <section className="mt-12 pt-12 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-4">
            About this piece
          </SerifHeading>
          <p className="text-charcoal-light leading-relaxed">{product.aboutThePiece}</p>
        </section>
      )}

      <section className="mt-8">
        <SerifHeading as="h2" className="mb-4">
          Product details
        </SerifHeading>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {details.map((d) => (
            <div key={d.label} className="flex gap-2">
              <dt className="text-charcoal-light shrink-0">{d.label}:</dt>
              <dd className="text-charcoal">{d.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {product.whatBuyersShouldKnow && (
        <section className="mt-8 pt-8 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-4">
            What buyers should know
          </SerifHeading>
          <p className="text-charcoal-light leading-relaxed">
            {product.whatBuyersShouldKnow}
          </p>
        </section>
      )}

      <ReviewsSection productId={product.id} productSlug={product.slug} />

      {relatedProducts.length > 0 && (
        <section className="mt-12 pt-12 border-t border-border-warm">
          <RelatedProducts products={relatedProducts as unknown as Parameters<typeof RelatedProducts>[0]["products"]} />
        </section>
      )}
    </div>
  );
}
