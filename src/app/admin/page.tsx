import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { SaleToggle } from "@/components/admin/SaleToggle";

export default async function AdminDashboardPage() {
  const [productCount, orderCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({ where: { status: "PAID" } }),
  ]);

  return (
    <div>
      <SerifHeading as="h1" className="mb-8">
        Dashboard
      </SerifHeading>
      <div className="mb-8">
        <SaleToggle />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/admin/products"
          className="block p-6 border border-border-warm rounded-lg bg-parchment-light hover:border-honey/50 transition-colors"
        >
          <h2 className="font-serif text-xl text-charcoal mb-2">Products</h2>
          <p className="text-3xl font-medium text-charcoal">{productCount}</p>
          <p className="text-sm text-charcoal-light mt-1">Manage sheet music</p>
        </Link>
        <div className="p-6 border border-border-warm rounded-lg bg-parchment-light">
          <h2 className="font-serif text-xl text-charcoal mb-2">Orders</h2>
          <p className="text-3xl font-medium text-charcoal">{orderCount}</p>
          <p className="text-sm text-charcoal-light mt-1">Paid orders</p>
        </div>
      </div>
    </div>
  );
}
