import { SerifHeading } from "@/components/shared/SerifHeading";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <SerifHeading as="h1" className="mb-8">
        Add product
      </SerifHeading>
      <ProductForm />
    </div>
  );
}
