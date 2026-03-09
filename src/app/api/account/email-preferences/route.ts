import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productUpdates, marketing } = await req.json();
    await prisma.newsletterPreference.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        productUpdates: productUpdates ?? true,
        marketing: marketing ?? false,
      },
      update: {
        productUpdates: productUpdates ?? undefined,
        marketing: marketing ?? undefined,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email preferences error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
