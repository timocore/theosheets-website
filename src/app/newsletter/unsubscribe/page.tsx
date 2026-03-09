import { Suspense } from "react";
import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { UnsubscribeForm } from "@/components/newsletter/UnsubscribeForm";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <SerifHeading as="h1" className="mb-6 text-center">
          Unsubscribe
        </SerifHeading>
        <Suspense fallback={<div className="text-charcoal-light">Loading…</div>}>
          <UnsubscribeForm token={token} />
        </Suspense>
        <p className="mt-6 text-center text-sm text-charcoal-light">
          <Link href="/" className="underline hover:text-honey">
            Back to TheoSheets
          </Link>
        </p>
      </div>
    </main>
  );
}
