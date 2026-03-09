import { SerifHeading } from "@/components/shared/SerifHeading";

export default function CookieNoticePage() {
  return (
    <>
      <SerifHeading as="h1" className="mb-6">
        Cookie Notice
      </SerifHeading>
      <div className="text-charcoal-light space-y-4">
        <p>
          We use cookies and similar technologies to run the site, remember
          your preferences, and keep you signed in.
        </p>
        <p>
          Essential cookies are required for the site to function. We may also
          use analytics cookies to understand how visitors use the site and
          improve our service. You can adjust your browser settings to limit
          cookies, though some features may not work correctly if you do.
        </p>
      </div>
    </>
  );
}
