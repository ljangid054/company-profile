"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CatalogImage } from "@/components/products/catalog-image";
import type { Product } from "@/types/product";
import { DEFAULT_PRODUCT_IMAGE } from "@/config/visual";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.category}/${product.slug}`;
  const cover = product.images[0] ?? DEFAULT_PRODUCT_IMAGE;
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group border border-border/40 bg-card"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease }}
    >
      <Link href={href} className="block focus-visible:outline-none">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
          <CatalogImage
            src={cover}
            alt={product.name}
            fill
            className="object-contain object-center p-5 transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
          {product.featured ? (
            <span className="absolute left-3 top-3 bg-foreground px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-background">
              Featured
            </span>
          ) : null}
        </div>
        <div className="border-t border-border/40 p-5">
          <h3 className="display-heading text-lg">{product.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
          {product.price ? (
            <p className="mt-3 text-sm font-medium">{product.price}</p>
          ) : null}
          <span className="link-arrow mt-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            Details
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </Link>
      <div className="flex gap-4 border-t border-border/40 px-5 py-4 text-sm">
        <Link href={href} className="underline underline-offset-4 hover:opacity-70">
          View
        </Link>
        <Link
          href={`/contact?product=${encodeURIComponent(product.slug)}#quote`}
          className="text-muted-foreground hover:text-foreground"
        >
          Quote
        </Link>
      </div>
    </motion.article>
  );
}
