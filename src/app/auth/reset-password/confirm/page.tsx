"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetConfirmForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset link.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid or expired link.");
        return;
      }
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-sm text-center">
        <h1 className="font-serif text-2xl text-charcoal mb-4">
          Password reset
        </h1>
        <p className="text-charcoal-light mb-6">
          Your password has been updated. You can now sign in.
        </p>
        <Link
          href="/auth/signin"
          className="inline-block bg-honey hover:bg-honey-light text-charcoal-dark font-medium px-6 py-2.5 rounded transition-colors"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full max-w-sm text-center">
        <h1 className="font-serif text-2xl text-charcoal mb-4">
          Invalid link
        </h1>
        <p className="text-charcoal-light mb-6">
          This password reset link is invalid or has expired.
        </p>
        <Link href="/auth/reset-password" className="underline text-honey">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-serif text-2xl text-charcoal mb-6 text-center">
        Set new password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm text-charcoal-light mb-1">
            New password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm text-charcoal-light mb-1">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2 border border-border-warm rounded bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-honey/50"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-honey hover:bg-honey-light text-charcoal-dark font-medium py-2.5 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Resetting…" : "Reset password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordConfirmPage() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6">
      <Suspense fallback={<div className="text-charcoal-light">Loading…</div>}>
        <ResetConfirmForm />
      </Suspense>
    </main>
  );
}
