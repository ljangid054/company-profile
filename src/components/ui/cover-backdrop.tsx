import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_COVER_IMAGE } from "@/config/visual";

export type CoverScrim = "hero" | "section" | "cta" | "subtle";

const scrimClass: Record<CoverScrim, string> = {
  hero: "bg-gradient-to-b from-background/40 via-background/80 to-background",
  section: "bg-gradient-to-b from-background/85 via-background/92 to-background",
  subtle: "bg-background/94",
  cta: "bg-gradient-to-r from-background/85 via-primary/8 to-background/90",
};

type CoverBackdropProps = {
  scrim?: CoverScrim;
  className?: string;
  priority?: boolean;
  imageSrc?: string;
};

export function CoverBackdrop({
  scrim = "section",
  className,
  priority = false,
  imageSrc = SITE_COVER_IMAGE,
}: CoverBackdropProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        priority={priority}
        quality={85}
        className={cn(
          "object-cover motion-safe:animate-ken-burns-slow motion-reduce:animate-none",
          scrim === "hero" ? "opacity-55" : "opacity-40",
        )}
        sizes="100vw"
        aria-hidden
      />
      <div className={cn("absolute inset-0", scrimClass[scrim])} aria-hidden />
    </div>
  );
}
