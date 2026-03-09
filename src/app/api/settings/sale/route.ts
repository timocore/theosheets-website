import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const KEY = "sale_percent";

export async function GET() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: KEY },
  });
  const salePercent = setting ? parseInt(setting.value, 10) || 0 : 0;
  return NextResponse.json({ salePercent });
}
