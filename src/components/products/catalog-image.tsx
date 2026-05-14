"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  isRemoteHttpUrl,
  normalizeCatalogImageUrl,
} from "@/lib/catalog-image-url";

type Props = {
  src: string;
  alt: string;
  /** Same as next/image fill: parent must be `relative` with explicit size */
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

/**
 * Remote http(s) URLs use a plain `<img>` so they behave like pasting HTML in an online editor
 * (no Next remotePatterns gate, works for Drive / arbitrary CDNs when the URL is loadable).
 * Local paths still use `next/image`.
 */
export function CatalogImage({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
  loading,
}: Props) {
  const resolved = normalizeCatalogImageUrl(src);

  if (isRemoteHttpUrl(resolved)) {
    if (fill) {
      return (
        <img
          src={resolved}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full", className)}
          loading={priority ? "eager" : loading ?? "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
      );
    }
    return (
      <img
        src={resolved}
        alt={alt}
        className={className}
        loading={priority ? "eager" : loading ?? "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      unoptimized
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
    />
  );
}
