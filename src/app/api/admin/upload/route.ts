import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getPresignedUploadUrl, S3_CONFIG } from "@/lib/s3";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!S3_CONFIG.isConfigured) {
    return NextResponse.json(
      { error: "S3 is not configured." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { filename, contentType, prefix = "private" } = body as {
      filename?: string;
      contentType?: string;
      prefix?: "private" | "preview";
    };

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "filename and contentType are required." },
        { status: 400 }
      );
    }

    const ext = filename.split(".").pop() ?? "bin";
    const safeName = crypto.randomBytes(8).toString("hex");
    const key =
      prefix === "preview"
        ? `${S3_CONFIG.previewPrefix}${safeName}.${ext}`
        : `${S3_CONFIG.privatePrefix}${safeName}.${ext}`;

    const url = await getPresignedUploadUrl(key, contentType);
    if (!url) {
      return NextResponse.json(
        { error: "Failed to generate upload URL." },
        { status: 500 }
      );
    }

    const publicUrl =
      S3_CONFIG.bucket && prefix === "preview"
        ? `https://${S3_CONFIG.bucket}.s3.${process.env.AWS_REGION ?? "us-east-1"}.amazonaws.com/${key}`
        : null;

    return NextResponse.json({
      uploadUrl: url,
      key,
      value: publicUrl ?? key,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
