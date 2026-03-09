import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SerifHeading as="h1" className="mb-10">
        Privacy Policy
      </SerifHeading>

      <div className="space-y-10 text-charcoal-light">
        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Introduction</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              TheoSheets respects your privacy and is committed to protecting your personal information.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit the TheoSheets website and purchase digital products from our store.
            </p>
            <p>
              By using this website, you agree to the practices described in this policy.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Information We Collect</h2>
          <div className="space-y-6 text-sm leading-relaxed">
            <p>We collect information in the following ways.</p>

            <div>
              <h3 className="font-medium text-charcoal mb-2">Information You Provide</h3>
              <p className="mb-2">
                When you use the website, you may provide personal information such as:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Your name</li>
                <li>Email address</li>
                <li>Billing information</li>
                <li>Account login credentials</li>
                <li>Messages sent through the contact form</li>
              </ul>
              <p className="mt-2">
                This information is provided voluntarily when you create an account, make a purchase, or contact us.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">Account Information</h3>
              <p className="mb-2">
                If you create an account on TheoSheets, we store information necessary to provide account functionality, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email address</li>
                <li>Encrypted password</li>
                <li>Purchase history</li>
                <li>Download history</li>
              </ul>
              <p className="mt-2">
                This allows you to access your purchases and re-download files.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">Payment Information</h3>
              <p>
                Payments are processed securely through Stripe, our third-party payment provider. TheoSheets does not store credit card numbers or payment details on our servers. Payment information is handled directly by Stripe in accordance with their security and privacy policies.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-charcoal mb-2">Usage Data</h3>
              <p className="mb-2">
                We may automatically collect certain technical information when you visit the website, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Pages visited</li>
                <li>Referring websites</li>
                <li>Interaction with the site</li>
              </ul>
              <p className="mt-2">
                This information helps us improve the performance and usability of the website.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">How We Use Your Information</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>The information we collect may be used to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Process and deliver your purchases</li>
              <li>Provide access to downloaded products</li>
              <li>Respond to customer support requests</li>
              <li>Send purchase confirmations and receipts</li>
              <li>Send account-related notifications</li>
              <li>Improve the functionality and performance of the website</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Email Communications</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>We may send emails related to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Order confirmations</li>
              <li>Download notifications</li>
              <li>Password resets</li>
              <li>Account updates</li>
            </ul>
            <p>
              If you subscribe to updates or newsletters, you may also receive emails about new sheet music releases and updates to the website.
            </p>
            <p>
              You may unsubscribe from marketing emails at any time. Transactional emails related to purchases may still be sent.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Cookies</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>TheoSheets may use cookies or similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Maintain login sessions</li>
              <li>Remember user preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve user experience</li>
            </ul>
            <p>
              Cookies are small files stored on your device that help the website function properly.
            </p>
            <p>
              You may disable cookies through your browser settings, although some features of the site may not function correctly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Third-Party Services</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              TheoSheets uses trusted third-party services to operate the website, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Stripe</strong> – payment processing</li>
              <li><strong>Resend</strong> – email delivery</li>
              <li>Hosting providers and infrastructure services</li>
            </ul>
            <p>
              These services may process limited information required to perform their functions.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Data Security</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure.
            </p>
            <p>
              However, no online system can guarantee complete security, and users provide information at their own risk.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Data Retention</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              We retain personal information only as long as necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide purchased products</li>
              <li>Maintain user accounts</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
            </ul>
            <p>
              Users may request account deletion by contacting us.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Children&apos;s Privacy</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              TheoSheets is not intended for children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Changes to This Policy</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              This Privacy Policy may be updated from time to time to reflect changes in services, legal requirements, or website functionality. Any updates will be posted on this page.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Contact</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              If you have questions about this Privacy Policy or how your information is handled, please contact us through the{" "}
              <Link href="/contact" className="text-honey hover:text-honey-dark underline underline-offset-2">
                Contact page
              </Link>{" "}
              on this website.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Our Commitment</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-charcoal">
              We believe musicians deserve both great music and respect for their privacy. TheoSheets is committed to protecting your information and providing a safe, secure experience.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
