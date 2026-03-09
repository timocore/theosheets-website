import Link from "next/link";
import Image from "next/image";

const INSTRUMENTS = [
  "Piano",
  "Vocal",
  "Violin",
  "Cello",
  "Flute",
  "Saxophone",
] as const;

const instrumentImages: Record<string, string> = {
  Piano:
    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop",
  Vocal:
    "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
  Violin:
    "https://images.unsplash.com/photo-1723404058975-4f36b6f4ea6c?w=400&h=400&fit=crop",
  Cello:
    "https://images.unsplash.com/photo-1690182183994-85c53baa6d10?w=400&h=400&fit=crop",
  Flute:
    "https://images.unsplash.com/photo-1698912128401-218e23515ee4?w=400&h=400&fit=crop",
  Saxophone:
    "https://images.unsplash.com/photo-1577369256636-2c077eec9abc?w=400&h=400&fit=crop",
};

const defaultImage =
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop";

export function ShopByInstrument() {
  return (
    <section className="py-16 px-6 bg-parchment-light border-t border-border-warm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-medium text-charcoal uppercase tracking-wider text-center mb-12">
          Shop by Instrument
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
          {INSTRUMENTS.map((name) => (
            <li key={name} className="flex flex-col items-center">
              <Link
                href={`/sheet-music?instrument=${encodeURIComponent(name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-border-warm group-hover:ring-honey transition-all shadow-sm">
                  <Image
                    src={instrumentImages[name] ?? defaultImage}
                    alt={name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="mt-3 text-sm font-medium text-charcoal text-center group-hover:text-honey transition-colors">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
