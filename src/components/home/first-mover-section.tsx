"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { SITE_COVER_IMAGE } from "@/config/visual";

export function FirstMoverSection() {
  return (
    <section id="about" className="section-light border-b border-section-light-foreground/10 py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-section-light-foreground/5">
          <Image
            src={SITE_COVER_IMAGE}
            alt="Somada workshop"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <TextReveal>
            <p className="section-label !text-section-light-foreground/50">First mover</p>
          </TextReveal>
          <TextReveal delay={0.08}>
            <h2 className="mega-headline mt-6 text-3xl text-section-light-foreground sm:text-4xl">
              Rooted in Somda, Rajasthan—building brass hospitality for the world
            </h2>
          </TextReveal>
          <TextReveal delay={0.14}>
            <p className="mt-6 text-base leading-relaxed text-section-light-foreground/65">
              {siteConfig.name} began as a maker-led experiment: could Rajasthan&apos;s brass
              discipline translate into repeatable hospitality supply—without losing warmth? Today we
              serve lounges, distributors, and collectors with a vision to make premium desi hookah
              culture more open, accessible, and export-ready.
            </p>
          </TextReveal>
          <TextReveal delay={0.2}>
            <Link
              href="/about"
              className="link-arrow mt-8 inline-flex text-section-light-foreground underline"
            >
              About {siteConfig.name}
              <ArrowRight className="size-4" />
            </Link>
          </TextReveal>
        </div>
      </Container>
    </section>
  );
}
