import { cn } from "@/lib/utils";

interface ReviewSummaryProps {
  average?: number | null;
  count?: number | null;
  className?: string;
}

export function ReviewSummary({
  average = 0,
  count = 0,
  className,
}: ReviewSummaryProps) {
  if (count === 0) {
    return (
      <p className={cn("text-sm text-charcoal-light", className)}>
        No reviews yet
      </p>
    );
  }

  const stars = Math.round(average ?? 0);
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <div className="flex" aria-label={`${average ?? 0} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={i <= stars ? "text-honey" : "text-border-warm"}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-charcoal-light">
        {(average ?? 0).toFixed(1)} ({count} review{count !== 1 ? "s" : ""})
      </span>
    </div>
  );
}
