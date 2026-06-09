import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "cream" | "light";
  className?: string;
};

export function Heading({
  as = "h2",
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: HeadingProps) {
  const Tag = as;
  const isLight = tone === "cream" || tone === "light";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "section-label mb-4",
            isLight && "!text-section-light-foreground/50",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "mega-headline text-balance",
          isLight ? "text-section-light-foreground" : "text-foreground",
          as === "h1" && "text-4xl sm:text-5xl lg:text-6xl",
          as === "h2" && "text-3xl sm:text-4xl lg:text-5xl",
          as === "h3" && "text-2xl sm:text-3xl",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            isLight ? "text-section-light-foreground/65" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
