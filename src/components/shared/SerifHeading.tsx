import { cn } from "@/lib/utils";

interface SerifHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
}

const sizeMap = {
  h1: "text-3xl md:text-4xl lg:text-5xl",
  h2: "text-2xl md:text-3xl",
  h3: "text-xl md:text-2xl",
  h4: "text-lg md:text-xl",
};

export function SerifHeading({
  as: Tag = "h2",
  children,
  className,
}: SerifHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif text-charcoal font-medium tracking-tight",
        sizeMap[Tag],
        className
      )}
    >
      {children}
    </Tag>
  );
}
