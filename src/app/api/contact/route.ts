import { NextResponse } from "next/server";
import { sendContactFormNotification } from "@/lib/email";

const contactEmail =
  process.env.CONTACT_EMAIL ??
  process.env.ADMIN_EMAILS?.split(",")[0]?.trim() ??
  "";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!contactEmail) {
      console.error("Contact form: CONTACT_EMAIL and ADMIN_EMAILS are not set in .env");
      return NextResponse.json(
        {
          error:
            "Contact form is not configured. Add CONTACT_EMAIL or ADMIN_EMAILS to your .env file.",
        },
        { status: 500 }
      );
    }

    const result = await sendContactFormNotification({
      to: contactEmail,
      name,
      email,
      message,
    });

    if (!result.ok) {
      const err = result.error;
      console.error("Contact form email failed:", err);
      if (err === "Email not configured") {
        return NextResponse.json(
          {
            error:
              "Email is not configured. Add RESEND_API_KEY and EMAIL_FROM to your .env file.",
          },
          { status: 500 }
        );
      }
      const msg =
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: string }).message)
          : typeof err === "string"
            ? err
            : "Failed to send message. Please try again.";
      const isResendRestriction =
        /only send.*to your own email|verify a domain|onboarding@resend/i.test(msg);
      return NextResponse.json(
        {
          error: isResendRestriction
            ? "Email setup issue: With Resend's test domain, you can only receive at the email you signed up with. Set CONTACT_EMAIL to that address, or verify your own domain at resend.com/domains and update EMAIL_FROM."
            : msg,
        },
        { status: 500 }
      );
    }

    console.log("Contact form email sent to:", contactEmail);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
