import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { ProductForm } from "@/components/admin/ProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });

  if (!product) notFound();

  const serialized = JSON.parse(
    JSON.stringify({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      variants: product.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    })
  );

  return (
    <div>
      <SerifHeading as="h1" className="mb-8">
        Edit {product.title}
      </SerifHeading>
      <ProductForm product={serialized} />
    </div>
  );
}
