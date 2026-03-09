import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ status: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { variants: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <SerifHeading as="h1">Products</SerifHeading>
        <Link
          href="/admin/products/new"
          className="bg-honey hover:bg-honey-light text-charcoal-dark font-medium px-4 py-2 rounded transition-colors"
        >
          Add product
        </Link>
      </div>
      <div className="border border-border-warm rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-parchment-dark">
            <tr>
              <th className="text-left p-4 font-medium text-charcoal">Title</th>
              <th className="text-left p-4 font-medium text-charcoal">Status</th>
              <th className="text-left p-4 font-medium text-charcoal">Price</th>
              <th className="text-left p-4 font-medium text-charcoal">Variants</th>
              <th className="text-left p-4 font-medium text-charcoal">Featured</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: (typeof products)[number]) => (
              <tr key={p.id} className="border-t border-border-warm">
                <td className="p-4">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="font-medium text-charcoal hover:text-honey"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      p.status === "PUBLISHED"
                        ? "bg-green-100 text-green-800"
                        : "bg-charcoal-light/20 text-charcoal-light"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-charcoal-light">${Number(p.price).toFixed(2)}</td>
                <td className="p-4 text-charcoal-light">{p._count.variants}</td>
                <td className="p-4">{p.featured ? "Yes" : "—"}</td>
                <td className="p-4">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-honey hover:text-honey-dark text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length === 0 && (
        <p className="text-charcoal-light py-8 text-center">
          No products yet.{" "}
          <Link href="/admin/products/new" className="text-honey hover:underline">
            Add your first product
          </Link>
        </p>
      )}
    </div>
  );
}
