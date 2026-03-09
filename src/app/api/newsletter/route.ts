import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewsletterConfirmation } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const token = crypto.randomBytes(24).toString("hex");
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: trimmed },
      create: {
        email: trimmed,
        status: "active",
        unsubscribeToken: token,
      },
      update: { status: "active" },
    });

    const unsubscribeToken = subscriber.unsubscribeToken ?? token;
    if (!subscriber.unsubscribeToken) {
      await prisma.newsletterSubscriber.update({
        where: { email: trimmed },
        data: { unsubscribeToken: token },
      });
    }

    await sendNewsletterConfirmation({
      to: trimmed,
      unsubscribeUrl: `${siteUrl}/newsletter/unsubscribe?token=${unsubscribeToken}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
