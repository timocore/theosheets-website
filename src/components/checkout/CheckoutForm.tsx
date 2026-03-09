"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart-store";
import { useSaleStore } from "@/store/sale-store";
import { CTAButton } from "@/components/shared/CTAButton";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface BillingData {
  email: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  couponCode: string;
}

function PaymentStep({
  clientSecret,
  billingData,
}: {
  clientSecret: string;
  billingData: BillingData;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, subtotal } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = subtotal() + 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError("");
    setLoading(true);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
        receipt_email: billingData.email.trim(),
        payment_method_data: {
          billing_details: {
            name: billingData.name.trim() || undefined,
            email: billingData.email.trim(),
            address: {
              line1: billingData.addressLine1.trim() || undefined,
              line2: billingData.addressLine2.trim() || undefined,
              city: billingData.city.trim() || undefined,
              state: billingData.state.trim() || undefined,
              postal_code: billingData.postalCode.trim() || undefined,
              country: billingData.country,
            },
          },
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="font-serif text-xl text-charcoal mb-4">Payment</h2>
        <div className="p-4 border border-border-warm rounded bg-white">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </section>
      <section className="border-t border-border-warm pt-6">
        <div className="flex justify-between font-medium text-charcoal text-lg mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-honey hover:bg-honey-light text-charcoal-dark font-medium py-3 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Processing…" : "Pay now"}
        </button>
      </section>
    </form>
  );
}

function CheckoutInner() {
  useSaleStore((s) => s.salePercent);
  const { items, subtotal } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const taxAmount = 0;
  const total = subtotal() + taxAmount;

  async function handleContinueToPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantKey: i.variantKey,
            quantity: i.quantity,
          })),
          email: email.trim(),
          billingAddress: {
            name: name.trim() || undefined,
            line1: addressLine1.trim() || undefined,
            line2: addressLine2.trim() || undefined,
            city: city.trim() || undefined,
            state: state.trim() || undefined,
            postalCode: postalCode.trim() || undefined,
            country,
          },
          couponCode: couponCode.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create payment");
      setClientSecret(data.clientSecret);
      setBillingData({
        email,
        name,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        couponCode,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    setLoading(false);
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-light mb-6">Your cart is empty.</p>
        <CTAButton href="/sheet-music">Browse sheet music</CTAButton>
      </div>
    );
  }

  if (clientSecret && billingData && stripePromise) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: { theme: "stripe" } }}
      >
        <PaymentStep clientSecret={clientSecret} billingData={billingData} />
      </Elements>
    );
  }

  return (
    <form onSubmit={handleContinueToPayment} className="space-y-8">
      <section>
        <h2 className="font-serif text-xl text-charcoal mb-4">Billing details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-charcoal-light mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm text-charcoal-light mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="block text-sm text-charcoal-light mb-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Street address"
            className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apartment, suite, etc. (optional)"
            className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="city" className="block text-sm text-charcoal-light mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm text-charcoal-light mb-1">
              State / Province
            </label>
            <input
              id="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm text-charcoal-light mb-1">
              ZIP / Postal code
            </label>
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="country" className="block text-sm text-charcoal-light mb-1">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </section>

      <div>
        <label htmlFor="coupon" className="block text-sm text-charcoal-light mb-1">
          Coupon code
        </label>
        <input
          id="coupon"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter code"
          className="w-full max-w-xs px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
        />
      </div>

      <section className="border-t border-border-warm pt-6">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-charcoal-light">
            <span>Subtotal</span>
            <span>${subtotal().toFixed(2)}</span>
          </div>
          {taxAmount > 0 && (
            <div className="flex justify-between text-charcoal-light">
              <span>Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-charcoal text-lg pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-honey hover:bg-honey-light text-charcoal-dark font-medium py-3 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Loading…" : "Continue to payment"}
        </button>
      </section>
    </form>
  );
}

export function CheckoutForm() {
  if (!stripePromise) {
    return (
      <div className="py-12">
        <p className="text-charcoal-light">Payment is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.</p>
      </div>
    );
  }

  return <CheckoutInner />;
}
