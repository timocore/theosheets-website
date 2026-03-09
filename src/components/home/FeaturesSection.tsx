const features = [
  {
    title: "Instant delivery",
    description: "Download your digital sheet music immediately after purchase. No waiting—start playing right away.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    title: "Beautiful scores",
    description: "Crafted with care for clarity and elegance. Professional notation and layout for every piece.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    title: "Piano & more",
    description: "Curated for pianists and creative performers. From contemplative to cinematic.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16h16M4 16V8M20 16V8M4 8h16M7 8V5M12 8V5M17 8V5" />
      </svg>
    ),
  },
  {
    title: "Accompaniments & multitracks",
    description: "Many pieces include full accompaniment tracks and multitrack packs for recording and performance.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-6 border-t border-border-warm">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-medium tracking-tight mb-12 text-center">
          Why Theo<span className="text-honey">Sheets</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center text-center p-6 rounded-lg bg-parchment-light hover:bg-parchment-dark transition-colors"
            >
              <div className="mb-4 text-honey group-hover:text-honey-dark transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">{feature.title}</h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
