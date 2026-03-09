import Link from "next/link";

interface LogoProps {
  href?: string;
  variant?: "light" | "dark";
  className?: string;
}

/** Two-tone logo: "Theo" in base color, "Sheets" in honey gold */
export function Logo({ href = "/", variant = "light", className = "" }: LogoProps) {
  const baseColor = variant === "dark" ? "text-parchment" : "text-charcoal";
  const accentColor = "text-honey";

  const content = (
    <span className={`font-serif text-xl ${className}`}>
      <span className={baseColor}>Theo</span>
      <span className={accentColor}>Sheets</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
