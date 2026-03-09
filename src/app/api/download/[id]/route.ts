import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getPresignedDownloadUrl,
  isPlaceholderKey,
  S3_CONFIG,
} from "@/lib/s3";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const download = await prisma.download.findFirst({
    where: {
      id,
      OR: [
        { userId: session.user.id },
        {
          order: { userId: session.user.id },
        },
      ],
    },
    include: { product: { select: { title: true } } },
  });

  if (!download) {
    return NextResponse.json({ error: "Download not found" }, { status: 404 });
  }

  if (isPlaceholderKey(download.s3Key)) {
    return NextResponse.json(
      {
        error: "This file is not yet available. Please contact support if you need assistance.",
      },
      { status: 503 }
    );
  }

  if (!S3_CONFIG.isConfigured) {
    return NextResponse.json(
      {
        error: "File delivery is not configured. Please contact support.",
      },
      { status: 503 }
    );
  }

  const ext = download.s3Key.match(/\.(\w+)$/)?.[1] ?? "pdf";
  const filename = `${download.product.title.replace(/[^a-zA-Z0-9]/g, "-")}-${download.assetType}.${ext}`;
  const url = await getPresignedDownloadUrl(download.s3Key, 3600, filename);
  if (!url) {
    return NextResponse.json(
      {
        error: "Unable to generate download link. The file may no longer be available.",
      },
      { status: 503 }
    );
  }

  await prisma.download.update({
    where: { id },
    data: { downloadCount: { increment: 1 } },
  });

  return NextResponse.redirect(url);
}
