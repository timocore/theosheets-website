import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number | null;
  prefix?: string;
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  prefix,
  className,
}: PriceDisplayProps) {
  const hasDiscount = compareAtPrice != null && compareAtPrice > price;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {prefix && (
        <span className="text-charcoal-light text-sm">{prefix}</span>
      )}
      <span className="font-medium text-charcoal">
        ${price.toFixed(2)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-charcoal-light line-through">
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
