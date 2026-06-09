"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";

const ecosystemSlugs = new Set([
  "custom-bespoke",
  "compact-artisan",
  "limited-editions",
]);

export function EcosystemGridSection() {
  const tiles = categories.filter((c) => ecosystemSlugs.has(c.slug));

  return (
    <section id="ecosystem" className="section-light border-b border-section-light-foreground/10 py-20 lg:py-28">
      <Container>
        <TextReveal>
          <p className="section-label !text-section-light-foreground/50">
            Ecosystem &amp; infrastructure
          </p>
        </TextReveal>
        <StaggerReveal className="mt-12 grid gap-px bg-section-light-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/products/${cat.slug}`}
                className="group flex h-full flex-col bg-section-light p-8 transition-colors hover:bg-section-light-foreground/[0.03]"
              >
                <h3 className="display-heading text-lg text-section-light-foreground">
                  {cat.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-section-light-foreground/60">
                  {cat.description}
                </p>
                <span className="link-arrow mt-6 text-section-light-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
