"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface UnsubscribeFormProps {
  token?: string;
}

export function UnsubscribeForm({ token }: UnsubscribeFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    fetch("/api/newsletter/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        setStatus(res.ok ? "success" : "error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  if (!token) {
    return (
      <p className="text-charcoal-light text-center">
        Invalid unsubscribe link. If you have an account, you can manage your
        email preferences there.
      </p>
    );
  }

  if (status === "loading") {
    return <p className="text-charcoal-light text-center">Unsubscribing…</p>;
  }

  if (status === "success") {
    return (
      <p className="text-charcoal-light text-center">
        You&apos;ve been unsubscribed. We&apos;re sorry to see you go.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-charcoal-light text-center">
        Something went wrong. The link may have expired. Try signing up again to
        get a fresh unsubscribe link.
      </p>
    );
  }

  return null;
}
