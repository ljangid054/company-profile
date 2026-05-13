import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function Heading({
  as = "h2",
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: HeadingProps) {
  const Tag = as;
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm shadow-primary/10">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "font-heading text-balance text-foreground",
          as === "h1" &&
            "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
          as === "h2" &&
            "text-3xl leading-tight sm:text-4xl lg:text-5xl",
          as === "h3" &&
            "text-2xl leading-snug sm:text-3xl",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
