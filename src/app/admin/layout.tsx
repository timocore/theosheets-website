import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-border-warm bg-parchment-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="font-serif text-lg text-charcoal hover:text-honey transition-colors"
            >
              Admin
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/admin/products"
                className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
              >
                Products
              </Link>
              <Link
                href="/"
                className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
              >
                View site
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
