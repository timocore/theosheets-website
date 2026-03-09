"use client";

import { useState } from "react";

interface EmailPreferencesFormProps {
  productUpdates: boolean;
  marketing: boolean;
}

export function EmailPreferencesForm({
  productUpdates: initialProductUpdates,
  marketing: initialMarketing,
}: EmailPreferencesFormProps) {
  const [productUpdates, setProductUpdates] = useState(initialProductUpdates);
  const [marketing, setMarketing] = useState(initialMarketing);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/account/email-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productUpdates, marketing }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={productUpdates}
          onChange={(e) => setProductUpdates(e.target.checked)}
          className="rounded border-border-warm text-honey focus:ring-honey/50"
        />
        <span className="text-charcoal">New releases and product updates</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="rounded border-border-warm text-honey focus:ring-honey/50"
        />
        <span className="text-charcoal">Marketing and promotions</span>
      </label>
      {status === "success" && (
        <p className="text-sm text-honey">Preferences saved.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-honey hover:bg-honey-light text-charcoal-dark font-medium px-6 py-2 rounded transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
