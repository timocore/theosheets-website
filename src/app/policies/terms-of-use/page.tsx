import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default function TermsOfUsePage() {
  return (
    <>
      <SerifHeading as="h1" className="mb-10">
        Terms of Use
      </SerifHeading>

      <div className="space-y-10 text-charcoal-light">
        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">1. Introduction</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>Welcome to TheoSheets.</p>
            <p>
              By accessing this website and purchasing or downloading any content from TheoSheets, you agree to comply with and be bound by the following Terms of Use.
            </p>
            <p>
              These terms govern the use of all digital products, services, and content available through this website.
            </p>
            <p>
              If you do not agree with these terms, please do not use the website or purchase products.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">2. Digital Products</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              TheoSheets provides digital products including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Sheet music in PDF format</li>
              <li>Demonstration audio recordings</li>
              <li>Accompaniment tracks</li>
              <li>Multitrack audio files</li>
            </ul>
            <p>
              All products are delivered digitally and are available for download through your TheoSheets account after purchase.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">3. License for Personal Use</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              When you purchase a product from TheoSheets, you are granted a non-exclusive, non-transferable license to use the purchased files for personal use.
            </p>
            <p>This license allows you to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Download the files to your personal devices</li>
              <li>Print the sheet music for your own use</li>
              <li>Perform the music in concerts, recitals, recordings, or personal projects</li>
              <li>Use accompaniment tracks for practice or performance</li>
            </ul>
            <p>
              The license does not transfer ownership of the content. All intellectual property remains the property of TheoSheets and the composer.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">4. Restrictions</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>You may not:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Share purchased files with others</li>
              <li>Distribute the files online</li>
              <li>Upload the files to public websites</li>
              <li>Resell or redistribute the sheet music or audio files</li>
              <li>Include the files in any digital product library or database</li>
              <li>Claim the music or content as your own work</li>
            </ul>
            <p>
              Each purchase is licensed for individual use only. If multiple performers or students require the same music, each person should obtain their own licensed copy.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">5. Account Responsibility</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Some features of the website require an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Ensuring your account information is accurate</li>
            </ul>
            <p>
              TheoSheets is not responsible for unauthorized use of your account.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">6. Downloads and File Access</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              After purchase, digital products will be available for download through your TheoSheets account.
            </p>
            <p>
              Customers may re-download previously purchased files from their account dashboard.
            </p>
            <p>
              TheoSheets reserves the right to modify file delivery systems or download methods while continuing to provide access to purchased products.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">7. Intellectual Property</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              All content on this website, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Sheet music</li>
              <li>Compositions</li>
              <li>Recordings</li>
              <li>Graphics</li>
              <li>Branding</li>
              <li>Website design</li>
            </ul>
            <p>
              is protected by copyright and intellectual property laws. Unauthorized reproduction or distribution of any content from TheoSheets is strictly prohibited.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">8. Payment Processing</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              All payments are securely processed through third-party payment providers.
            </p>
            <p>
              TheoSheets does not store credit card information on its servers.
            </p>
            <p>
              Prices are listed in U.S. Dollars (USD) unless otherwise stated.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">9. Limitation of Liability</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              TheoSheets provides digital products &quot;as is&quot;. While we strive to ensure all files are accurate and accessible, TheoSheets shall not be held liable for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Technical issues beyond our control</li>
              <li>Compatibility issues with third-party software</li>
              <li>Interruptions in website access</li>
            </ul>
            <p>
              Our maximum liability shall not exceed the amount paid for the product.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">10. Changes to Terms</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              TheoSheets reserves the right to update or modify these Terms of Use at any time.
            </p>
            <p>
              Any changes will be posted on this page. Continued use of the website after changes are made constitutes acceptance of the updated terms.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">11. Contact</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              If you have questions regarding these Terms of Use, please contact us through the{" "}
              <Link href="/contact" className="text-honey hover:text-honey-dark underline underline-offset-2">
                Contact page
              </Link>{" "}
              on this website.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Supporting Independent Music</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-charcoal">
              Every purchase helps support the creation of new music for performers and listeners. Thank you for supporting independent composers and musicians through TheoSheets.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
