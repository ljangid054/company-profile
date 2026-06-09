"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { DEFAULT_PRODUCT_IMAGE } from "@/config/visual";

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4);

  return (
    <section id="work" className="section-light border-b border-section-light-foreground/10 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <TextReveal>
              <p className="section-label !text-section-light-foreground/50">Work</p>
            </TextReveal>
            <TextReveal delay={0.08}>
              <h2 className="mega-headline mt-4 text-3xl text-section-light-foreground sm:text-4xl lg:text-5xl">
                Featured brass programs
              </h2>
            </TextReveal>
          </div>
          <TextReveal delay={0.12}>
            <Link
              href="/products"
              className="link-arrow text-section-light-foreground underline"
            >
              go to work
              <ArrowRight className="size-4" />
            </Link>
          </TextReveal>
        </div>

        <StaggerReveal className="mt-14 grid gap-px bg-section-light-foreground/10 sm:grid-cols-2">
          {featured.map((product) => {
            const cover = product.images[0] ?? DEFAULT_PRODUCT_IMAGE;
            const href = `/products/${product.category}/${product.slug}`;
            return (
              <StaggerItem key={product.id}>
                <Link
                  href={href}
                  className="group relative block overflow-hidden bg-section-light"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-section-light-foreground/5">
                    <Image
                      src={cover}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="border-t border-section-light-foreground/10 p-6">
                    <h3 className="display-heading text-lg text-section-light-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-section-light-foreground/55 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <span className="link-arrow mt-4 text-section-light-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
                      View details
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </Container>
    </section>
  );
}
