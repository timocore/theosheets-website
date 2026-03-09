"use client";

import { useState, useEffect } from "react";
import { useSaleStore } from "@/store/sale-store";

export function SaleToggle() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const salePercent = useSaleStore((s) => s.salePercent);
  const setSalePercent = useSaleStore((s) => s.setSalePercent);

  useEffect(() => {
    fetch("/api/admin/settings/sale")
      .then((r) => r.json())
      .then((data) => setSalePercent(data.salePercent ?? 0))
      .catch(() => setSalePercent(0));
  }, [setSalePercent]);

  async function handleToggle() {
    setError("");
    setSaving(true);
    const newPercent = salePercent > 0 ? 0 : 30;
    try {
      const res = await fetch("/api/admin/settings/sale", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salePercent: newPercent }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setSalePercent(data.salePercent);
    } catch {
      setError("Failed to update sale setting");
    }
    setSaving(false);
  }

  async function handleSetPercent(percent: number) {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings/sale", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salePercent: percent }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setSalePercent(data.salePercent);
    } catch {
      setError("Failed to update sale setting");
    }
    setSaving(false);
  }

  return (
    <div className="p-6 border border-border-warm rounded-lg bg-parchment-light">
      <h2 className="font-serif text-xl text-charcoal mb-2">Store-wide sale</h2>
      <p className="text-sm text-charcoal-light mb-4">
        {salePercent > 0
          ? `${salePercent}% off applied to all products`
          : "No sale active"}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={saving}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            salePercent > 0
              ? "bg-charcoal-light text-parchment hover:bg-charcoal"
              : "bg-honey text-charcoal-dark hover:bg-honey-light"
          } disabled:opacity-50`}
        >
          {salePercent > 0 ? "Turn sale off" : "Turn 30% sale on"}
        </button>
        {salePercent > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-charcoal-light">Or set:</span>
            {[10, 20, 30, 40, 50].map((p) => (
              <button
                key={p}
                onClick={() => handleSetPercent(p)}
                disabled={saving}
                className={`px-2 py-1 rounded text-sm ${
                  salePercent === p
                    ? "bg-honey text-charcoal-dark"
                    : "border border-border-warm text-charcoal hover:bg-parchment-dark"
                } disabled:opacity-50`}
              >
                {p}%
              </button>
            ))}
            <button
              onClick={() => handleSetPercent(0)}
              disabled={saving}
              className="px-2 py-1 rounded text-sm border border-border-warm text-charcoal hover:bg-parchment-dark disabled:opacity-50"
            >
              Off
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
