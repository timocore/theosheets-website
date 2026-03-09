import { SerifHeading } from "@/components/shared/SerifHeading";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";

export default function CheckoutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <SerifHeading as="h1" className="mb-8">
        Checkout
      </SerifHeading>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  );
}
