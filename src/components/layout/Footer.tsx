import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border-warm bg-parchment-dark mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo href="/" variant="light" className="text-lg" />
            <p className="mt-2 text-sm text-charcoal-light">
              Elegant sheet music for piano, worship, and cinematic performance.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-charcoal mb-3">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sheet-music"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Sheet Music Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-charcoal mb-3">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/refund-policy"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-charcoal mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/policies/terms-of-use"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy-policy"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/licensing"
                  className="text-sm text-charcoal-light hover:text-honey transition-colors"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-border-warm text-center text-sm text-charcoal-light">
          © {new Date().getFullYear()} TheoSheets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
