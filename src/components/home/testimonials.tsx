"use client";

import { testimonials } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <Section coverBackground coverScrim="section" className="border-t border-border/60">
      <Container>
        <FadeIn variant="blur">
          <Heading
            eyebrow="Proof"
            align="center"
            as="h2"
            title="Trusted by lounges, distributors, and boutique brands"
            description="A snapshot of partner feedback—expect pragmatic timelines, crisp documentation, and brass character that sells itself."
          />
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <FadeIn key={t.name} delay={idx * 0.08}>
              <blockquote className="glass-panel flex h-full flex-col rounded-3xl p-8">
                <Quote className="size-8 text-primary/80" aria-hidden />
                <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </p>
                <footer className="mt-8 border-t border-border/60 pt-6">
                  <p className="font-heading text-base text-foreground">{t.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
