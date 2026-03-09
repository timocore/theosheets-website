"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/account/purchases", label: "Purchases" },
  { href: "/account/downloads", label: "Downloads" },
  { href: "/account/receipts", label: "Receipts" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/email-preferences", label: "Email preferences" },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "block px-3 py-2 text-sm rounded transition-colors",
            pathname === item.href
              ? "bg-parchment-dark text-charcoal font-medium"
              : "text-charcoal-light hover:text-charcoal hover:bg-parchment-dark"
          )}
        >
          {item.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="block w-full text-left px-3 py-2 text-sm rounded transition-colors text-charcoal-light hover:text-charcoal hover:bg-parchment-dark"
      >
        Sign out
      </button>
    </nav>
  );
}
