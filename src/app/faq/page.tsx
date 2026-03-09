import { SerifHeading } from "@/components/shared/SerifHeading";
import { FAQAccordion } from "@/components/faq/FAQAccordion";

const faqSections = [
  {
    title: "Purchasing & Downloads",
    items: [
      {
        q: "How do I receive my sheet music after purchase?",
        a: (
          <>
            Immediately after completing your purchase, your files become available for download.
            <br /><br />
            You will receive a confirmation email with a link to your downloads, and the files will also appear in your TheoSheets account under &quot;My Downloads.&quot; You can re-download your purchases anytime.
          </>
        ),
      },
      {
        q: "Do I need an account to purchase?",
        a: (
          <>
            No. You can check out as a guest.
            <br /><br />
            After your purchase, a TheoSheets account is automatically created using your email so you can access your downloads anytime in the future.
          </>
        ),
      },
      {
        q: "Can I download my files again later?",
        a: "Yes. Your purchases remain available in your account dashboard so you can re-download them whenever you need.",
      },
      {
        q: "What file formats do you provide?",
        a: (
          <>
            Depending on the product, downloads may include:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>PDF sheet music</li>
              <li>MP3 demonstration audio</li>
              <li>Accompaniment tracks</li>
              <li>Multitrack audio files (for production use)</li>
            </ul>
            Each product page clearly lists what is included.
          </>
        ),
      },
      {
        q: "Can I preview the sheet music before buying?",
        a: "Yes. Each score includes a preview of the first page so you can see the style and notation before purchasing.",
      },
      {
        q: "Can I listen to the piece before purchasing?",
        a: "Yes. Most scores include a demo recording so you can hear how the piece sounds before buying.",
      },
    ],
  },
  {
    title: "Sheet Music Usage",
    items: [
      {
        q: "What am I allowed to do with purchased sheet music?",
        a: (
          <>
            When you purchase a score, you receive a single-user license that allows you to:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Practice and perform the music</li>
              <li>Use it for concerts, recordings, and personal projects</li>
              <li>Print copies for your own use</li>
            </ul>
            You may not redistribute, resell, or upload the files online.
          </>
        ),
      },
      {
        q: "Can I perform this music publicly?",
        a: "Yes. You are free to perform the music in recitals, concerts, and recordings. If the piece is recorded or broadcast commercially, please credit the composer when possible.",
      },
      {
        q: "Can I share the files with friends or students?",
        a: "No. The purchase license is for individual use only. If multiple people need the score, each person should purchase their own copy.",
      },
    ],
  },
  {
    title: "Audio & Accompaniment Tracks",
    items: [
      {
        q: "What are accompaniment tracks?",
        a: (
          <>
            Some pieces include piano accompaniment or orchestral backing tracks that allow you to perform the piece with a full musical background.
            <br /><br />
            These are ideal for:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Recitals</li>
              <li>Practice</li>
              <li>Recordings</li>
              <li>Live performances</li>
            </ul>
          </>
        ),
      },
      {
        q: "What are multitrack files?",
        a: "Multitracks are separate audio stems used for mixing and production. They are intended for musicians, producers, and recording artists who want more control over the arrangement.",
      },
      {
        q: "Can I use the accompaniment tracks in performances or recordings?",
        a: "Yes. You may use the tracks for live performances, practice, and recordings. Redistribution of the raw audio files is not permitted.",
      },
    ],
  },
  {
    title: "Payments & Security",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Payments are securely processed through Stripe, which supports most major credit and debit cards. Your payment information is never stored on our servers.",
      },
      {
        q: "What currency are prices listed in?",
        a: "All prices are listed in USD (U.S. Dollars). Your bank or card provider may convert the price to your local currency.",
      },
    ],
  },
  {
    title: "Refunds",
    items: [
      {
        q: "Do you offer refunds?",
        a: "Because our products are digital downloads, purchases are generally non-refundable. If you experience a technical issue with your files, please contact us and we will be happy to help.",
      },
    ],
  },
  {
    title: "Technical Questions",
    items: [
      {
        q: "I didn't receive my download email. What should I do?",
        a: "First check your spam or promotions folder. If you still can't find it, log into your TheoSheets account and access your downloads from My Downloads. You can also contact us for assistance.",
      },
      {
        q: "The file won't open. What should I do?",
        a: (
          <>
            PDF files can be opened with most devices using apps such as:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Adobe Acrobat Reader</li>
              <li>Apple Books</li>
              <li>Preview (Mac)</li>
              <li>Chrome or Edge browser</li>
            </ul>
            If you continue to have trouble, please contact us.
          </>
        ),
      },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        q: "How can I contact you?",
        a: "You can reach us through the Contact page on this site. We typically respond within 24–48 hours.",
      },
    ],
  },
  {
    title: "Who creates the music on TheoSheets?",
    items: [
      {
        q: "Who creates the music on TheoSheets?",
        a: "TheoSheets features original music created for performers who enjoy expressive, cinematic, and reflective piano repertoire. Our goal is to provide music that is both musically rewarding to play and meaningful to listen to.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <SerifHeading as="h1" className="mb-10">
          FAQ
        </SerifHeading>
        <FAQAccordion sections={faqSections} />
      </div>
    </main>
  );
}
