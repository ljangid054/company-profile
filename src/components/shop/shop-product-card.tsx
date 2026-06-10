"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CatalogImage } from "@/components/products/catalog-image";
import type { Product } from "@/types/product";
import { DEFAULT_PRODUCT_IMAGE } from "@/config/visual";

export function ShopProductCard({ product }: { product: Product }) {
  const href = `/products/${product.category}/${product.slug}`;
  const cover = product.images[0] ?? DEFAULT_PRODUCT_IMAGE;
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="shop-card group"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="block">
        <div className="shop-product-image-wrap relative mx-auto aspect-square max-w-[220px] overflow-hidden">
          <CatalogImage
            src={cover}
            alt={product.name}
            fill
            className="shop-product-image object-contain object-center p-2"
            sizes="220px"
            loading="lazy"
          />
          {product.featured ? <span className="wine-badge">Sale</span> : null}
        </div>
        <h3 className="shop-product-title font-heading mt-5 text-xl font-normal text-foreground">
          {product.name}
        </h3>
        {product.price ? (
          <p className="mt-2 text-lg text-foreground">{product.price}</p>
        ) : null}
      </Link>
      <div className="mt-4 flex flex-col items-center gap-2">
        <Link href={href} className="drinkify-btn shop-product-btn !px-6 !py-2.5 !text-base">
          View product
        </Link>
        <Link
          href={`/contact?product=${encodeURIComponent(product.slug)}#quote`}
          className="text-sm text-muted-foreground underline-offset-4 transition-colors duration-500 hover:text-[var(--drinkify-gold)] hover:underline"
        >
          Request quote
        </Link>
      </div>
    </motion.article>
  );
}
