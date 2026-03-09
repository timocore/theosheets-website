import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getSalePrice } from "@/lib/sale";
import { getSalePercentFromDb } from "@/lib/sale-server";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { items, email, billingAddress, couponCode } = body as {
      items: { productId: string; variantKey: string; quantity: number }[];
      email: string;
      billingAddress?: Record<string, string>;
      couponCode?: string;
    };

    if (!items?.length || !email?.trim()) {
      return NextResponse.json(
        { error: "Items and email are required." },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    // Validate items and compute totals
    const validatedItems: {
      productId: string;
      variantId: string | null;
      variantKey: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      productTitle: string;
      productSlug: string;
    }[] = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId, status: "PUBLISHED", isActive: true },
        include: { variants: true },
      });
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found.` },
          { status: 400 }
        );
      }
      const variant = product.variants.find((v: (typeof product.variants)[number]) => v.key === item.variantKey);
      if (!variant) {
        return NextResponse.json(
          { error: `Variant ${item.variantKey} not found for ${product.title}.` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.min(10, item.quantity));
      const salePercent = await getSalePercentFromDb();
      const unitPrice = getSalePrice(Number(variant.price), salePercent);
      const totalPrice = unitPrice * qty;
      subtotal += totalPrice;
      validatedItems.push({
        productId: product.id,
        variantId: variant.id,
        variantKey: variant.key,
        quantity: qty,
        unitPrice,
        totalPrice,
        productTitle: product.title,
        productSlug: product.slug,
      });
    }

    // Tax: simplified 0% for now (Stripe Tax can be added later)
    const taxRate = 0;
    const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
    const discountAmount = 0; // Additional coupon handling can be added
    const total = Math.round((subtotal + taxAmount - discountAmount) * 100) / 100;

    const amountInCents = Math.round(total * 100);

    if (amountInCents < 50) {
      return NextResponse.json(
        { error: "Minimum order amount is $0.50." },
        { status: 400 }
      );
    }

    const metadata: Record<string, string> = {
      email: email.trim().toLowerCase(),
      itemsJson: JSON.stringify(
        validatedItems.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          variantKey: i.variantKey,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.totalPrice,
          productTitle: i.productTitle,
          productSlug: i.productSlug,
        }))
      ),
    };
    if (session?.user?.id) metadata.userId = session.user.id;
    if (billingAddress) metadata.billingAddressJson = JSON.stringify(billingAddress);
    if (couponCode) metadata.couponCode = couponCode;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata,
      receipt_email: email.trim(),
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
