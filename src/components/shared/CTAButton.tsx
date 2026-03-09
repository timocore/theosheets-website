import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-honey/50 focus:ring-offset-2";
  const variants = {
    primary: "bg-honey hover:bg-honey-light text-charcoal-dark",
    secondary: "bg-charcoal hover:bg-charcoal-dark text-parchment",
    outline: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-parchment",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
