"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { ReviewSummary } from "@/components/shared/ReviewSummary";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  authorName: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  productId: string;
  productSlug: string;
}

export function ReviewsSection({ productId, productSlug }: ReviewsSectionProps) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews ?? []);
        setAverage(data.average ?? 0);
        setCount(data.count ?? 0);
      }
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError("Please select a rating (1–5 stars)");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment: comment.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      setAverage(data.average);
      setCount(data.count);
      setRating(0);
      setComment("");
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    }
    setSubmitting(false);
  }

  return (
    <section className="mt-12 pt-12 border-t border-border-warm">
      <SerifHeading as="h2" className="mb-4">
        Reviews
      </SerifHeading>
      <div className="mb-6">
        <ReviewSummary average={average} count={count} />
      </div>

      {status === "authenticated" && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border border-border-warm rounded-lg bg-parchment-light">
          <p className="text-sm font-medium text-charcoal mb-2">Write a review</p>
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                className={`text-2xl transition-colors ${
                  i <= rating ? "text-honey" : "text-border-warm hover:text-charcoal-light"
                }`}
                aria-label={`${i} star${i > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm text-charcoal placeholder:text-charcoal-light mb-3 resize-none"
            maxLength={2000}
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            disabled={submitting || rating < 1}
            className="px-4 py-2 bg-honey hover:bg-honey-light text-charcoal-dark font-medium rounded text-sm transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </button>
        </form>
      )}

      {status === "unauthenticated" && (
        <p className="text-sm text-charcoal-light mb-6">
          <Link href={`/auth/signin?callbackUrl=/sheet-music/${productSlug}`} className="text-honey hover:underline">
            Sign in
          </Link>{" "}
          to leave a review.
        </p>
      )}

      {loading ? (
        <p className="text-sm text-charcoal-light">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-charcoal-light">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="py-4 border-b border-border-warm last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={i <= r.rating ? "text-honey" : "text-border-warm"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-charcoal">{r.authorName}</span>
                <span className="text-xs text-charcoal-light">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
              {r.comment && (
                <p className="text-sm text-charcoal-light leading-relaxed mt-1">{r.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
