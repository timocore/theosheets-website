import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  sendOrderConfirmation,
  sendDownloadsReady,
  sendSetPasswordEmail,
} from "@/lib/email";
import crypto from "crypto";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
  console.warn("STRIPE_WEBHOOK_SECRET is not set - webhooks will not work");
}

function getAssetKeyForVariant(
  product: { fullPdfFile: string | null; accompanimentFile: string | null; multitrackFile: string | null; standaloneMp3File: string | null },
  variantKey: string
): string | null {
  switch (variantKey) {
    case "pdf":
      return product.fullPdfFile;
    case "accompaniment":
      return product.accompanimentFile;
    case "multitrack":
      return product.multitrackFile;
    case "mp3":
      return product.standaloneMp3File;
    case "bundle":
      return product.fullPdfFile ?? product.accompanimentFile ?? product.multitrackFile;
    default:
      return product.fullPdfFile;
  }
}

function getAssetTypesForVariant(variantKey: string): string[] {
  switch (variantKey) {
    case "pdf":
      return ["pdf"];
    case "accompaniment":
      return ["accompaniment"];
    case "multitrack":
      return ["multitrack"];
    case "mp3":
      return ["mp3"];
    case "bundle":
      return ["pdf", "accompaniment", "multitrack"].filter(Boolean);
    default:
      return ["pdf"];
  }
}

async function fulfillOrder(paymentIntent: Stripe.PaymentIntent) {
  const { metadata } = paymentIntent;
  const email = metadata?.email;
  const userId = metadata?.userId || undefined;
  const itemsJson = metadata?.itemsJson;
  const billingAddressJson = metadata?.billingAddressJson;
  const couponCode = metadata?.couponCode;

  if (!email || !itemsJson) {
    console.error("Missing email or items in payment intent metadata");
    return;
  }

  const items = JSON.parse(itemsJson) as {
    productId: string;
    variantId: string | null;
    variantKey: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productTitle: string;
    productSlug: string;
  }[];

  let orderUserId = userId;
  let isNewUser = false;

  if (!orderUserId) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      orderUserId = existingUser.id;
    } else {
      const newUser = await prisma.user.create({
        data: { email, name: null },
      });
      orderUserId = newUser.id;
      isNewUser = true;
    }
  }

  const orderNumber = `TS-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);
  const taxAmount = 0;
  const discountAmount = 0;
  const total = subtotal + taxAmount - discountAmount;

  const billingAddress = billingAddressJson ? JSON.parse(billingAddressJson) : null;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: orderUserId,
      guestEmail: !userId ? email : null,
      status: "PAID",
      subtotal,
      taxAmount,
      discountAmount,
      total,
      stripePaymentIntentId: paymentIntent.id,
      couponCode: couponCode || null,
      billingAddress,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          variantKey: item.variantKey,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          productSnapshot: {
            title: item.productTitle,
            slug: item.productSlug,
          },
        })),
      },
    },
    include: { items: true },
  });

  for (const item of order.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (!product) continue;

    const assetTypes = getAssetTypesForVariant(item.variantKey);
    for (const assetType of assetTypes) {
      const s3Key = getAssetKeyForVariant(product, assetType);
      const key = s3Key ?? `pending/${order.id}/${item.productId}/${assetType}`;
      await prisma.download.create({
        data: {
          orderId: order.id,
          userId: orderUserId,
          productId: item.productId,
          assetType,
          s3Key: key,
        },
      });
    }
  }

  if (isNewUser) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.setPasswordToken.create({
      data: {
        userId: orderUserId!,
        token,
        expiresAt,
      },
    });
    await sendSetPasswordEmail({ to: email, token });
  }

  const orderItems = order.items.map((i: (typeof order.items)[number]) => ({
    title: (i.productSnapshot as { title?: string })?.title ?? "Item",
    quantity: i.quantity,
    totalPrice: Number(i.totalPrice),
  }));

  await sendOrderConfirmation({
    to: email,
    orderNumber: order.orderNumber,
    total: Number(order.total),
    items: orderItems,
  });

  await sendDownloadsReady({
    to: email,
    orderNumber: order.orderNumber,
    itemCount: order.items.length,
  });
}

export async function POST(req: NextRequest) {
  if (!webhookSecret || !stripe) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    try {
      await fulfillOrder(paymentIntent);
    } catch (error) {
      console.error("Order fulfillment error:", error);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
