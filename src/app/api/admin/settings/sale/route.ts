import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

const KEY = "sale_percent";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const setting = await prisma.siteSetting.findUnique({
    where: { key: KEY },
  });
  const salePercent = setting ? parseInt(setting.value, 10) || 0 : 0;
  return NextResponse.json({ salePercent });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const salePercent = Math.max(0, Math.min(100, parseInt(String(body.salePercent ?? 0), 10) || 0));
  await prisma.siteSetting.upsert({
    where: { key: KEY },
    create: { key: KEY, value: String(salePercent) },
    update: { value: String(salePercent) },
  });
  return NextResponse.json({ salePercent });
}
