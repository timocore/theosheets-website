import { SerifHeading } from "@/components/shared/SerifHeading";
import { CartContent } from "@/components/cart/CartContent";

export default function CartPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <SerifHeading as="h1" className="mb-8">
        Cart
      </SerifHeading>
      <CartContent />
    </main>
  );
}
