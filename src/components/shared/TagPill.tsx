import { cn } from "@/lib/utils";

interface TagPillProps {
  children: React.ReactNode;
  className?: string;
}

export function TagPill({ children, className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-parchment-dark text-charcoal-light border border-border-warm",
        className
      )}
    >
      {children}
    </span>
  );
}
