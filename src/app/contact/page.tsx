import { SerifHeading } from "@/components/shared/SerifHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <SerifHeading as="h1" className="mb-4">
        Contact
      </SerifHeading>
      <p className="text-charcoal-light mb-8">
        Have a question or feedback? We&apos;d love to hear from you.
      </p>
      <ContactForm />
    </main>
  );
}
