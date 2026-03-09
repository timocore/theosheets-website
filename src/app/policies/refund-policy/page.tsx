import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default function RefundPolicyPage() {
  return (
    <>
      <SerifHeading as="h1" className="mb-10">
        Refund Policy
      </SerifHeading>

      <div className="space-y-10 text-charcoal-light">
        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Overview</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              All products sold on TheoSheets are digital downloads. Because digital files are delivered instantly and cannot be returned, purchases are generally non-refundable once the files have been accessed or downloaded.
            </p>
            <p>
              However, we want every customer to have a positive experience, and we will always do our best to help if something goes wrong.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">When Refunds May Be Considered</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>Refunds may be considered in the following situations:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>You were charged twice for the same purchase</li>
              <li>You did not receive access to the files due to a technical issue</li>
              <li>The downloaded file is corrupted or incomplete and cannot be replaced</li>
            </ul>
            <p>
              If you experience any of these issues, please contact us and we will work to resolve the problem promptly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Situations Where Refunds Are Not Typically Offered</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Because our products are immediately accessible digital downloads, refunds are generally not provided in the following cases:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>You changed your mind after purchasing</li>
              <li>You purchased the wrong item by mistake</li>
              <li>You expected a different style of music after listening to the preview</li>
              <li>You no longer need the product</li>
            </ul>
            <p>
              We encourage customers to review the preview score and demo recording available on each product page before purchasing.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Technical Issues</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              If you encounter any technical difficulties such as:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Problems downloading files</li>
              <li>Files not opening properly</li>
              <li>Missing items from a download package</li>
            </ul>
            <p>
              Please contact us and we will make sure you receive the correct files.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Contact for Support</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              If you need assistance with a purchase, please contact us through the{" "}
              <Link href="/contact" className="text-honey hover:text-honey-dark underline underline-offset-2">
                Contact page
              </Link>{" "}
              on this website.
            </p>
            <p>When reaching out, please include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>The email used for your purchase</li>
              <li>The name of the product</li>
              <li>A brief description of the issue</li>
            </ul>
            <p>We typically respond within 24–48 hours.</p>
            <p className="text-charcoal pt-2">
              Our goal is to make TheoSheets a trusted place for musicians to discover and enjoy new music. If something isn&apos;t working as expected, please reach out and we will gladly help.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Policy Updates</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              This refund policy may be updated occasionally to reflect changes in our services or legal requirements. Any updates will be posted on this page.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
