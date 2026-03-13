import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { CTAButton } from "@/components/shared/CTAButton";

export default function AboutPage() {
  return (
    <main>
      {/* Dark warm hero - same as home */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/hero.png)" }}
        />
        <div className="absolute inset-0 bg-charcoal-dark/55" aria-hidden />
        <div className="relative z-10 text-parchment flex flex-col items-center gap-7">
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-center">
            About Theo<span className="text-honey">Sheets</span>
          </h1>
          <p className="text-lg md:text-xl text-parchment/90 max-w-xl text-center">
            Music written to be performed.
          </p>
          <CTAButton href="/sheet-music" size="lg">
            Browse Sheet Music
          </CTAButton>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal mb-4">
            A Place for Music That Inspires Performance
          </h2>
          <div className="space-y-4 text-charcoal-light leading-relaxed">
            <p>
              TheoSheets was created to share expressive, beautifully crafted music with performers around the world.
            </p>
            <p>
              Whether you are a pianist practicing at home, a performer preparing for a recital, or a musician exploring new repertoire, TheoSheets exists to provide music that is inspiring to play and meaningful to hear.
            </p>
          </div>
        </section>

        {/* The Vision */}
        <section className="mb-12 pt-12 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-4">
            The Vision
          </SerifHeading>
          <div className="space-y-4 text-charcoal-light leading-relaxed">
            <p>
              Music has the power to move people, to tell stories, and to create moments that stay with us long after the final note fades.
            </p>
            <p>
              TheoSheets was founded with a simple vision: to create and share music that musicians genuinely enjoy performing.
            </p>
            <p>
              Each piece is written with the performer in mind — balancing musical expression, playability, and emotional depth.
            </p>
          </div>
        </section>

        {/* What You'll Find Here */}
        <section className="mb-12 pt-12 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-4">
            What You&apos;ll Find Here
          </SerifHeading>
          <div className="space-y-4 text-charcoal-light leading-relaxed">
            <p>
              TheoSheets offers carefully prepared digital music resources including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Original piano compositions</li>
              <li>Printable sheet music</li>
              <li>Demo recordings</li>
              <li>Accompaniment tracks</li>
              <li>Multitrack audio files for production and performance</li>
            </ul>
            <p>
              Every score is designed to help musicians experience the music fully, whether practicing, performing, or recording.
            </p>
          </div>
        </section>

        {/* Designed for Musicians */}
        <section className="mb-12 pt-12 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-4">
            Designed for Musicians
          </SerifHeading>
          <div className="space-y-4 text-charcoal-light leading-relaxed">
            <p>
              The platform is built to make the experience simple and musician-friendly.
            </p>
            <p>
              When you purchase music from TheoSheets, you receive:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Instant digital downloads</li>
              <li>Access to your purchases anytime through your account</li>
              <li>High-quality sheet music files</li>
              <li>Audio recordings that help bring the music to life</li>
            </ul>
            <p>
              The goal is to make discovering and performing new music as smooth and enjoyable as possible.
            </p>
          </div>
        </section>

        {/* Supporting Independent Music */}
        <section className="mb-12 pt-12 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-4">
            Supporting Independent Music
          </SerifHeading>
          <div className="space-y-4 text-charcoal-light leading-relaxed">
            <p>
              Every purchase on TheoSheets directly supports the creation of new music.
            </p>
            <p>
              Independent composers rely on performers and listeners who believe in the value of original music. Your support makes it possible to continue writing, recording, and sharing new works.
            </p>
            <p className="text-charcoal">
              Thank you for being part of that journey.
            </p>
          </div>
        </section>

        {/* Composer Story */}
        <section className="mb-12 pt-12 border-t border-border-warm">
          <SerifHeading as="h2" className="mb-8">
            Composer Story
          </SerifHeading>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-full md:w-64 shrink-0 aspect-[3/4] md:aspect-square relative rounded-lg overflow-hidden bg-parchment-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/composer-portrait.png"
                alt="Theo Timoc, composer and founder of TheoSheets"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl text-charcoal mb-6">
                The Composer Behind TheoSheets
              </h3>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  TheoSheets was created by composer and musician Theo Timoc, with the goal of sharing music that performers genuinely enjoy playing.
                </p>
                <p>
                  From an early age, music has been more than just notes on a page — it has been a way of expressing ideas, emotions, and moments that words often cannot capture. Writing music became a natural extension of that.
                </p>
                <p>
                  Over time, the desire to share these pieces with other musicians grew into TheoSheets.
                </p>
              </div>

              <h4 className="font-serif text-lg text-charcoal mt-8 mb-3">Music Written for the Performer</h4>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  Many pieces are written with a simple question in mind: &quot;Will the performer enjoy playing this?&quot;
                </p>
                <p>
                  Music should not only sound beautiful to the audience — it should also feel rewarding in the hands of the musician performing it.
                </p>
                <p>
                  The compositions shared on TheoSheets aim to balance:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Expressive melodies</li>
                  <li>Rich harmonies</li>
                  <li>Thoughtful musical structure</li>
                  <li>Playability and musical flow</li>
                </ul>
                <p>
                  The goal is music that invites interpretation and personal expression.
                </p>
              </div>

              <h4 className="font-serif text-lg text-charcoal mt-8 mb-3">Influences</h4>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  The musical language behind TheoSheets draws inspiration from a wide range of traditions and styles, including:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Classical piano repertoire</li>
                  <li>Cinematic music</li>
                  <li>Modern instrumental composition</li>
                  <li>Reflective and atmospheric sound worlds</li>
                </ul>
                <p>
                  These influences combine to create music that feels both familiar and fresh.
                </p>
              </div>

              <h4 className="font-serif text-lg text-charcoal mt-8 mb-3">A Growing Collection</h4>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  TheoSheets is not just a library of existing works — it is an evolving collection.
                </p>
                <p>
                  New compositions, arrangements, and recordings are added over time as the musical journey continues.
                </p>
                <p>
                  The hope is that musicians will return to discover new pieces and continue exploring the music.
                </p>
              </div>

              <h4 className="font-serif text-lg text-charcoal mt-8 mb-3">For Musicians Everywhere</h4>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  TheoSheets exists for musicians who love discovering new repertoire and bringing music to life.
                </p>
                <p>
                  Whether you are performing on stage, practicing late at night, recording in a studio, or simply playing for the joy of it, the music shared here is meant to be played, interpreted, and experienced.
                </p>
                <p className="text-charcoal">
                  Music only truly comes alive when it is performed. Thank you for giving these pieces a voice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Thank You */}
        <section className="mb-12 pt-12 border-t border-border-warm text-center">
          <p className="text-charcoal-light">
            Whether you are discovering a new piece to perform or simply exploring the music, thank you for spending time on TheoSheets.
          </p>
        </section>

        {/* Discover the Music CTA */}
        <section className="pt-12 border-t border-border-warm text-center rounded-lg px-8 py-12 bg-gradient-to-br from-parchment-dark via-honey/15 to-parchment-light">
          <SerifHeading as="h2" className="mb-3">
            Discover the Music
          </SerifHeading>
          <p className="text-charcoal-light mb-8 max-w-xl mx-auto">
            Explore the growing collection of original scores available on TheoSheets.
          </p>
          <Link
            href="/sheet-music"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-honey text-charcoal-dark font-medium hover:bg-honey-light transition-colors"
          >
            Browse Sheet Music
            <span aria-hidden>→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
