import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_COVER_IMAGE } from "@/config/visual";

export type CoverScrim = "hero" | "section" | "cta" | "subtle";

const scrimClass: Record<CoverScrim, string> = {
  hero: "bg-gradient-to-b from-background/50 via-background/75 to-background",
  section:
    "bg-gradient-to-b from-background/82 via-background/90 to-background/96",
  subtle: "bg-background/92",
  cta: "bg-gradient-to-r from-background/78 via-primary/14 to-background/90",
};

type CoverBackdropProps = {
  scrim?: CoverScrim;
  className?: string;
  priority?: boolean;
  /** Defaults to atmospheric site cover */
  imageSrc?: string;
};

/** Full-bleed cover image + gradient scrim for readable text */
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
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div
        className={cn("absolute inset-0", scrimClass[scrim])}
        aria-hidden
      />
    </div>
  );
}
