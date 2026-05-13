"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { motion } from "framer-motion";

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <Section coverBackground coverScrim="section">
      <Container>
        <FadeIn variant="blur">
          <Heading
            eyebrow="Catalog preview"
            as="h2"
            title="Featured brass programs"
            description="A curated snapshot from our benches—heritage desi silhouettes, bespoke pairs, and lounge-grade handcrafted brass hookahs."
          />
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 6).map((p, idx) => (
            <FadeIn key={p.id} delay={idx * 0.06} variant="scale">
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>

        <FadeIn variant="up" delay={0.12} className="mt-12">
          <motion.div
            className="glass-panel flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 p-6 sm:flex-row sm:items-center sm:p-8"
            whileHover={{ borderColor: "oklch(0.8 0.13 76 / 0.35)" }}
            transition={{ duration: 0.35 }}
          >
            <p className="max-w-xl text-sm text-muted-foreground">
              Need finishes, bespoke engraving, or export packing for your region? Our craft desk replies with clear timelines and bench notes.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Browse full catalog</Link>
            </Button>
          </motion.div>
        </FadeIn>
      </Container>
    </Section>
  );
}
