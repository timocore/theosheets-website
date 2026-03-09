"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-serif text-2xl text-charcoal mb-4">
            Account created
          </h1>
          <p className="text-charcoal-light mb-6">
            You&apos;re all set. Sign in with your email and password to get started.
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
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label htmlFor="password" className="block text-sm text-charcoal-light mb-1">
              Password
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
            <p className="mt-1 text-xs text-charcoal-light">
              At least 8 characters
            </p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-honey hover:bg-honey-light text-charcoal-dark font-medium py-2.5 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal-light">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline hover:text-honey">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
