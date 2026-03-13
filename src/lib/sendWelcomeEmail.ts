import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Resend } from "resend";

export const WELCOME_EMAIL_SUBJECT =
  "You’re on the TheoSheets founding list";

export const WELCOME_EMAIL_PREVIEW_TEXT =
  "Founding members will receive a complimentary premium score and lifetime recognition on TheoSheets.";

export const WELCOME_EMAIL_TEXT = `TheoSheets
Expressive Piano Editions

Welcome to the TheoSheets Founding List

Thank you for joining the TheoSheets founding list.

Your place is confirmed, and you are now part of the early circle of musicians who will receive first access when the TheoSheets collection is released.

As a founding member, you will receive:
- early access to the collection
- a complimentary premium score
- lifetime Founding Musician recognition on TheoSheets

Thank you for joining before launch. It means a great deal to begin in the company of musicians who care about expressive, carefully crafted editions.

With thanks,
Theo Timoc
Composer & Creator of TheoSheets

We’ll only send occasional updates about the TheoSheets launch.`;

export type SendWelcomeEmailParams = {
  resend?: Resend;
  to: string | string[];
  from?: string;
  replyTo?: string;
  htmlPath?: string;
  unsubscribeUrl?: string;
  tags?: string[];
};

export function getWelcomeEmailHtml(htmlPath = "welcome-email.html") {
  return readFileSync(join(process.cwd(), htmlPath), "utf8");
}

export async function sendWelcomeEmail({
  resend: resendClient,
  to,
  from = "TheoSheets <hello@theosheets.com>",
  replyTo,
  htmlPath = "welcome-email.html",
  unsubscribeUrl,
  tags,
}: SendWelcomeEmailParams) {
  const resend =
    resendClient ??
    (process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null);

  if (!resend) {
    console.warn("Resend not configured. Would have sent welcome email to:", to);
    return { data: null, error: new Error("Email not configured") };
  }

  let html = getWelcomeEmailHtml(htmlPath);
  if (unsubscribeUrl) {
    html = html.replace(/\{\{UNSUBSCRIBE_URL\}\}/g, unsubscribeUrl);
  }

  return resend.emails.send({
    from,
    to,
    replyTo,
    subject: WELCOME_EMAIL_SUBJECT,
    html,
    text: WELCOME_EMAIL_TEXT,
    tags: tags?.map((tag) => ({
      name: "category",
      value: tag,
    })),
  });
}
