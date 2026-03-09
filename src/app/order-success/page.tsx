import Link from "next/link";
import { Suspense } from "react";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { OrderSuccessClient } from "@/components/checkout/OrderSuccessClient";

export default function OrderSuccessPage() {
  return (
    <>
      <Suspense fallback={null}>
        <OrderSuccessClient />
      </Suspense>
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
      <SerifHeading as="h1" className="mb-4">
        Thank you for your order
      </SerifHeading>
      <p className="text-charcoal-light mb-8">
        Your purchase is complete. You&apos;ll receive an email with download
        links shortly. You can also access your files anytime from your account.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CTAButton href="/account/downloads">View downloads</CTAButton>
        <CTAButton href="/sheet-music" variant="outline">
          Continue shopping
        </CTAButton>
      </div>
      </main>
    </>
  );
}
