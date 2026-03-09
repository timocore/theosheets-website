import Image from "next/image";
import Link from "next/link";

const bannerImage = "/images/piano-crafted.png";
const sideImage = "/images/violin-sheet-music.png";

export function SpotlightSection() {
  return (
    <section className="border-t border-border-warm">
      {/* Full-width banner */}
      <div className="relative h-52 sm:h-60 md:h-[28rem] lg:h-[44rem] xl:h-[52rem] w-full overflow-hidden">
        <Image
          src={bannerImage}
          alt="Piano interior with keys, hammers, and strings"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-charcoal-dark/50" aria-hidden />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment font-medium tracking-tight mb-2">
            Crafted for Performance
          </h2>
          <p className="text-parchment/90 text-sm sm:text-base max-w-xl mb-6">
            Discover premium sheet music designed for pianists and creative
            performers—warm, expressive, and ready for your next performance.
          </p>
          <Link
            href="/sheet-music"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-parchment text-parchment font-medium hover:bg-parchment hover:text-charcoal-dark transition-colors"
          >
            Browse the Collection
          </Link>
        </div>
      </div>

      {/* Two-column: text left, image right (glued together) */}
      <div className="flex flex-col md:flex-row w-full min-h-[60vh] md:min-h-[70vh]">
        <div className="w-full md:w-1/2 bg-parchment-light px-8 py-10 md:py-14 md:px-12 lg:px-16 flex flex-col justify-center">
          <p className="text-sm text-charcoal-light mb-2">
            By Theo Timoc
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal font-medium mb-4">
            Elegant violin arrangements, crafted for clarity and expression
          </h3>
          <div className="h-px w-12 bg-honey mb-6" aria-hidden />
          <p className="text-charcoal-light leading-relaxed">
            Discover beautiful violin sheet music by composer Theo Timoc—warm,
            expressive arrangements designed for reflection and performance.
            Professional notation and thoughtful orchestrations ready for your
            next recital or concert.
          </p>
        </div>
        <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-0 shrink-0">
          <Image
            src={sideImage}
            alt="Violin and sheet music"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
