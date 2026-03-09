import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ subscribed: false });
  }

  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { email: session.user.email.toLowerCase() },
  });

  const subscribed =
    !!subscriber && subscriber.status === "active" && !subscriber.unsubscribedAt;

  return NextResponse.json({ subscribed });
}
