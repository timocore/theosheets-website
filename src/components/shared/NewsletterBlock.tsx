"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SerifHeading } from "./SerifHeading";

const STORAGE_KEY = "theosheets_newsletter_subscribed";

export function NewsletterBlock() {
  const { data: session, status: sessionStatus } = useSession();
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribed, setSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (session?.user?.email) {
      fetch("/api/newsletter/status")
        .then((res) => res.json())
        .then((data) => setSubscribed(data.subscribed === true))
        .catch(() => setSubscribed(false));
    } else {
      const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
      setSubscribed(stored === "1");
    }
  }, [session?.user?.email, sessionStatus]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormStatus("success");
        setEmail("");
        setSubscribed(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, "1");
        }
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  if (subscribed === true) {
    return (
      <section className="py-12 px-6 border-t border-border-warm">
        <div className="max-w-xl mx-auto text-center">
          <SerifHeading as="h2" className="mb-2">
            Stay in tune
          </SerifHeading>
          <p className="text-honey font-medium">You&apos;re subscribed.</p>
          <p className="text-charcoal-light text-sm mt-1">
            We&apos;ll send you updates on new releases and sheet music.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 border-t border-border-warm">
      <div className="max-w-xl mx-auto text-center">
        <SerifHeading as="h2" className="mb-2">
          Stay in tune
        </SerifHeading>
        <p className="text-charcoal-light text-sm mb-6">
          Get updates on new releases and sheet music.
        </p>
        {formStatus === "success" ? (
          <p className="text-honey font-medium">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              disabled={formStatus === "loading"}
              className="flex-1 px-4 py-2 border border-border-warm rounded bg-white text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-honey/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="px-6 py-2 bg-honey hover:bg-honey-light text-charcoal-dark font-medium rounded transition-colors disabled:opacity-50"
            >
              {formStatus === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
        )}
        {formStatus === "error" && (
          <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
