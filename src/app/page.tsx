import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { Logo } from "@/components/shared/Logo";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ShopByInstrument } from "@/components/home/ShopByInstrument";
import { SpotlightSection } from "@/components/home/SpotlightSection";
import { NewsletterBlock } from "@/components/shared/NewsletterBlock";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);

  return (
    <main>
      {/* Dark warm hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/hero.png)" }}
        />
        <div className="absolute inset-0 bg-charcoal-dark/55" aria-hidden />
        <div className="relative z-10 text-parchment">
        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
          <div className="flex justify-center">
            <Logo href="/" variant="dark" className="text-4xl md:text-6xl" />
          </div>
        </h1>
        <p className="text-lg md:text-xl text-parchment/90 max-w-xl mb-8">
          Elegant sheet music for piano, worship, and cinematic performance.
        </p>
        <CTAButton href="/sheet-music" size="lg">
          Browse Sheet Music
        </CTAButton>
        </div>
      </section>

      {/* Featured scores */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-6 border-t border-border-warm">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <SerifHeading as="h2">Featured scores</SerifHeading>
              <Link
                href="/sheet-music"
                className="text-charcoal-light hover:text-honey text-sm font-medium transition-colors"
              >
                View all
              </Link>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      <ShopByInstrument />

      <FeaturesSection />

      <SpotlightSection />

      <NewsletterBlock />
    </main>
  );
}
