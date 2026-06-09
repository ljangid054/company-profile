import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SITE_LOGO_IMAGE } from "@/config/visual";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** Light backdrop so the mark reads on dark headers */
  framed?: boolean;
};

export function BrandLogo({ className, priority, framed = false }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden",
        framed &&
          "rounded-xl bg-white p-1.5 shadow-md shadow-black/20 ring-2 ring-white/30",
        className,
      )}
    >
      <Image
        src={SITE_LOGO_IMAGE}
        alt={`${siteConfig.name} logo`}
        fill
        priority={priority}
        className="object-contain object-center contrast-125 saturate-110"
        sizes="160px"
      />
    </span>
  );
}
