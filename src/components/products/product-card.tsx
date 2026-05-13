"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_PRODUCT_IMAGE } from "@/config/visual";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.category}/${product.slug}`;
  const cover = product.images[0] ?? DEFAULT_PRODUCT_IMAGE;
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease }}
    >
      <Card className="group h-full overflow-hidden border-primary/15 bg-card/70 transition-shadow duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
        <Link href={href} className="block focus-visible:outline-none">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-muted/50 to-muted/10">
            <Image
              src={cover}
              alt={product.name}
              fill
              className="object-contain object-center p-3 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            {product.featured ? (
              <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground shadow-md shadow-primary/25">
                Featured
              </Badge>
            ) : null}
          </div>
          <CardHeader className="space-y-2">
            <CardTitle className="font-heading text-xl leading-snug tracking-tight">
              {product.name}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {product.shortDescription}
            </CardDescription>
          </CardHeader>
        </Link>
        <CardContent className="flex flex-wrap gap-2 pt-0">
          <Button asChild size="sm">
            <Link href={href}>View details</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/contact?product=${encodeURIComponent(product.slug)}#quote`}>
              Request quote
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
