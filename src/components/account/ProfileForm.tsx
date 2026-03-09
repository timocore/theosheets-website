"use client";

import { useState } from "react";

interface ProfileFormProps {
  email: string;
  name: string;
}

export function ProfileForm({ email, name: initialName }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
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
      <div>
        <label htmlFor="email" className="block text-sm text-charcoal-light mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="w-full px-4 py-2 border border-border-warm rounded bg-parchment-dark text-charcoal-light cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-charcoal-light">
          Email cannot be changed here.
        </p>
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
      {status === "success" && (
        <p className="text-sm text-honey">Profile updated.</p>
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
