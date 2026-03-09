"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/shared/Logo";
import { useCartStore } from "@/store/cart-store";

export function Header() {
  const { data: session, status } = useSession();
  const itemCount = useCartStore((s) => s.itemCount());
  const [mounted, setMounted] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCount = mounted ? itemCount : 0;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 border-b border-border-warm bg-parchment/95 backdrop-blur supports-[backdrop-filter]:bg-parchment/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Logo href="/" variant="light" />

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/sheet-music"
            className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
          >
            Sheet Music
          </Link>
          <Link
            href="/about"
            className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-1 text-charcoal-light hover:text-charcoal transition-colors"
            aria-label={`Cart with ${displayCount} items`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {displayCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-honey text-charcoal-dark text-xs font-medium rounded-full px-1">
                {displayCount}
              </span>
            )}
          </Link>

          {status === "loading" ? (
            <span className="text-charcoal-light text-sm">…</span>
          ) : session ? (
            <div className="relative" ref={ref}>
              <button
                type="button"
                onClick={() => setAccountOpen((o) => !o)}
                className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
              >
                Account
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-1 py-1 min-w-[140px] bg-white border border-border-warm rounded shadow-lg z-50">
                  <Link
                    href="/account"
                    onClick={() => setAccountOpen(false)}
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-parchment-dark transition-colors"
                  >
                    My account
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-parchment-dark transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
