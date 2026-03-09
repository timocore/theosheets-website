"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-serif text-2xl text-charcoal mb-4">
            Check your email
          </h1>
          <p className="text-charcoal-light mb-6">
            If an account exists for {email}, we&apos;ve sent a password reset
            link. Please check your inbox.
          </p>
          <Link
            href="/auth/signin"
            className="text-honey hover:text-honey-dark underline"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-2xl text-charcoal mb-6 text-center">
          Reset password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-charcoal-light mb-1">
              Email
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
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-honey hover:bg-honey-light text-charcoal-dark font-medium py-2.5 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal-light">
          <Link href="/auth/signin" className="underline hover:text-honey">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
