"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";

export function InfrastructureSection() {
  return (
    <section id="thesis" className="border-b border-border/40 py-20 lg:py-28">
      <Container>
        <TextReveal>
          <p className="section-label">Infrastructure for global hospitality</p>
        </TextReveal>
        <TextReveal delay={0.08}>
          <h2 className="mega-headline mt-6 max-w-4xl text-3xl sm:text-4xl lg:text-5xl">
            Lounges revolutionized the experience—it&apos;s time to do the same for brass supply.
          </h2>
        </TextReveal>
        <TextReveal delay={0.14}>
          <Link
            href="/contact#quote"
            className="link-arrow mt-8 inline-flex text-foreground underline"
          >
            Get the workshop report
            <ArrowRight className="size-4" />
          </Link>
        </TextReveal>
        <TextReveal delay={0.2}>
          <div className="mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Hospitality brass is overdue for its broadband moment—and we&apos;re building the
              workshop and infrastructure to enable it. Somada makes quality programmable:
              bench-balanced, finish-verified, and export-ready.
            </p>
            <p>
              We call the discipline built on this foundation <strong className="text-foreground">trustware brass</strong>.
              From heritage desi silhouettes trusted by collectors—to lounge series engineered for
              rotation, export packing, and distributor confidence—Somada is building the complete
              brass hospitality stack.
            </p>
          </div>
        </TextReveal>
      </Container>
    </section>
  );
}
