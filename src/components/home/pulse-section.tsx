"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";

export function PulseSection() {
  return (
    <section id="pulse" className="border-b border-border/40 py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <TextReveal>
              <p className="section-label">Latest from Somada</p>
            </TextReveal>
            <TextReveal delay={0.08}>
              <h2 className="mega-headline mt-4 text-3xl sm:text-4xl">
                The pulse of hospitality brass
              </h2>
            </TextReveal>
            <TextReveal delay={0.12}>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Partner feedback, export programs, and workshop discipline—straight from our Somda
                benches.
              </p>
            </TextReveal>
          </div>
          <TextReveal delay={0.14}>
            <Link href="/contact" className="link-arrow text-foreground underline">
              View all stories
              <ArrowRight className="size-4" />
            </Link>
          </TextReveal>
        </div>

        <StaggerReveal className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.08}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <blockquote className="border-t border-border/50 pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
