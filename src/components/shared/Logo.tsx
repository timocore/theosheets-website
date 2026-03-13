import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  href?: string;
  variant?: "light" | "dark";
  className?: string;
}

const LOGO_SRC = {
  light: "/brand/theosheets-logo-navbar.svg",
  dark: "/brand/theosheets-logo-banner-honey-gold.svg",
} as const;

/** SVG wordmarks: navbar (light bg) or banner (dark bg) */
export function Logo({ href = "/", variant = "light", className = "" }: LogoProps) {
  const src = LOGO_SRC[variant];
  const dimensions = variant === "dark" ? { width: 440, height: 100 } : { width: 200, height: 50 };

  const content = (
    <span className={`inline-block leading-none ${className ? `h-[1em] ${className}` : "h-9"}`}>
      <Image
        src={src}
        alt="TheoSheets"
        width={dimensions.width}
        height={dimensions.height}
        className="h-full w-auto object-contain align-middle"
        priority={false}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
