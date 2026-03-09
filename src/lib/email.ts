import { Resend } from "resend";

const resend =
  process.env.RESEND_API_KEY && process.env.EMAIL_FROM
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const from = process.env.EMAIL_FROM ?? "TheoSheets <hello@example.com>";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function baseHtml(content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TheoSheets</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f0e8; color: #3d3630;">
  <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="font-family: Georgia, serif; font-size: 24px; font-weight: 500; color: #2c2416; margin: 0;">TheoSheets</h1>
    </div>
    <div style="background: #fff; border-radius: 8px; padding: 32px; border: 1px solid #e5ddd4;">
      ${content}
    </div>
    <p style="text-align: center; font-size: 12px; color: #6b635b; margin-top: 24px;">
      © ${new Date().getFullYear()} TheoSheets. Elegant sheet music for piano, worship, and cinematic performance.
    </p>
  </div>
</body>
</html>
  `.trim();
}

function buttonHtml(href: string, label: string) {
  return `
    <a href="${href}" style="display: inline-block; background-color: #c9a227; color: #2c2416; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 16px 0;">
      ${label}
    </a>
  `;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("Email not configured. Would have sent:", { to, subject });
    return { ok: false, error: "Email not configured" };
  }
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error };
    }
    return { ok: true };
  } catch (err) {
    console.error("Send email error:", err);
    return { ok: false, error: err };
  }
}

export async function sendOrderConfirmation({
  to,
  orderNumber,
  total,
  items,
}: {
  to: string;
  orderNumber: string;
  total: number;
  items: { title: string; quantity: number; totalPrice: number }[];
}) {
  const itemsList = items
    .map(
      (i) =>
        `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5ddd4;">${i.quantity}× ${i.title}</td><td style="padding: 8px 0; border-bottom: 1px solid #e5ddd4; text-align: right;">$${i.totalPrice.toFixed(2)}</td></tr>`
    )
    .join("");
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">Thank you for your order</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      Your order <strong>#${orderNumber}</strong> has been confirmed.
    </p>
    <table style="width: 100%; margin: 24px 0;">
      ${itemsList}
    </table>
    <p style="font-weight: 600; margin: 16px 0;">Total: $${total.toFixed(2)}</p>
    <p style="color: #6b635b; margin: 24px 0 16px;">
      Your downloads are ready. Sign in to your account to access them anytime.
    </p>
    ${buttonHtml(`${siteUrl}/account/downloads`, "Access my downloads")}
  `;
  return sendEmail({
    to,
    subject: `Order #${orderNumber} confirmed — TheoSheets`,
    html: baseHtml(content),
  });
}

export async function sendDownloadsReady({
  to,
  orderNumber,
  itemCount,
}: {
  to: string;
  orderNumber: string;
  itemCount: number;
}) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">Your downloads are ready</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      Order #${orderNumber} — ${itemCount} file${itemCount !== 1 ? "s" : ""} ready to download.
    </p>
    <p style="color: #6b635b; margin: 0 0 16px;">
      Sign in to your account to access your sheet music and audio files. You can re-download anytime.
    </p>
    ${buttonHtml(`${siteUrl}/account/downloads`, "Access my downloads")}
  `;
  return sendEmail({
    to,
    subject: `Your TheoSheets downloads are ready`,
    html: baseHtml(content),
  });
}

export async function sendSetPasswordEmail({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const url = `${siteUrl}/auth/set-password?token=${token}`;
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">Set your password</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      You made a purchase at TheoSheets. We've created an account for you so you can access your downloads anytime.
    </p>
    <p style="color: #6b635b; margin: 0 0 16px;">
      Click below to set your password. This link expires in 7 days.
    </p>
    ${buttonHtml(url, "Set my password")}
    <p style="font-size: 12px; color: #6b635b; margin: 24px 0 0;">
      If you didn't make this purchase, you can ignore this email.
    </p>
  `;
  return sendEmail({
    to,
    subject: "Set your TheoSheets password",
    html: baseHtml(content),
  });
}

export async function sendPasswordResetEmail({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const url = `${siteUrl}/auth/reset-password/confirm?token=${token}`;
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">Reset your password</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      We received a request to reset your TheoSheets password.
    </p>
    <p style="color: #6b635b; margin: 0 0 16px;">
      Click below to set a new password. This link expires in 1 hour.
    </p>
    ${buttonHtml(url, "Reset password")}
    <p style="font-size: 12px; color: #6b635b; margin: 24px 0 0;">
      If you didn't request this, you can safely ignore this email.
    </p>
  `;
  return sendEmail({
    to,
    subject: "Reset your TheoSheets password",
    html: baseHtml(content),
  });
}

export async function sendWelcomeEmail({ to, name }: { to: string; name?: string | null }) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">Welcome to TheoSheets</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      ${greeting}
    </p>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      Thanks for creating an account. You can now browse our sheet music, save your favorites, and access your purchases anytime.
    </p>
    ${buttonHtml(`${siteUrl}/sheet-music`, "Browse sheet music")}
  `;
  return sendEmail({
    to,
    subject: "Welcome to TheoSheets",
    html: baseHtml(content),
  });
}

export async function sendContactFormNotification({
  to,
  name,
  email,
  message,
}: {
  to: string;
  name: string;
  email: string;
  message: string;
}) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">New contact form message</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 8px;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;"><strong>Reply to:</strong> <a href="mailto:${email}" style="color: #c9a227;">${email}</a></p>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 8px;"><strong>Message:</strong></p>
    <p style="color: #3d3630; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
  `;
  return sendEmail({
    to,
    subject: `Contact form: ${name} — TheoSheets`,
    html: baseHtml(content),
  });
}

export async function sendNewsletterConfirmation({
  to,
  unsubscribeUrl,
}: {
  to: string;
  unsubscribeUrl?: string;
}) {
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2416; margin: 0 0 16px;">You're subscribed</h2>
    <p style="color: #3d3630; line-height: 1.6; margin: 0 0 24px;">
      Thanks for signing up for TheoSheets updates. We'll send you news about new releases and sheet music.
    </p>
    <p style="color: #6b635b; margin: 0 0 16px;">
      You can unsubscribe anytime from your account or by clicking the link in any email we send.
    </p>
    ${buttonHtml(`${siteUrl}/sheet-music`, "Browse sheet music")}
    ${unsubscribeUrl ? `<p style="font-size: 12px; color: #6b635b; margin-top: 24px;"><a href="${unsubscribeUrl}" style="color: #6b635b;">Unsubscribe</a></p>` : ""}
  `;
  return sendEmail({
    to,
    subject: "You're subscribed to TheoSheets",
    html: baseHtml(content),
  });
}
