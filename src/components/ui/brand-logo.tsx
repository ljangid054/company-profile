import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SITE_LOGO_IMAGE } from "@/config/visual";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  /** Tailwind height class for the logo box (width scales with aspect ratio) */
  className?: string;
  priority?: boolean;
};

/** Raster brand mark — use inside a positioned or flex row; parent controls layout */
export function BrandLogo({ className, priority }: BrandLogoProps) {
  return (
    <span className={cn("relative block shrink-0", className)}>
      <Image
        src={SITE_LOGO_IMAGE}
        alt={`${siteConfig.name} logo`}
        fill
        priority={priority}
        className="object-contain object-left"
        sizes="200px"
      />
    </span>
  );
}
