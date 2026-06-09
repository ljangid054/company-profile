"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";

export function BuildCtaSection() {
  return (
    <section className="border-b border-border/40 py-20 lg:py-28">
      <Container className="text-center">
        <TextReveal>
          <h2 className="mega-headline text-3xl sm:text-4xl lg:text-5xl">
            Let&apos;s build your brass program
          </h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <Link
            href="/products"
            className="link-arrow mt-10 inline-flex text-foreground underline"
          >
            Explore products
            <ArrowRight className="size-4" />
          </Link>
        </TextReveal>
      </Container>
    </section>
  );
}
