"use client";

import { testimonials } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { HorizontalMarquee } from "@/components/motion/horizontal-marquee";
import { TextReveal } from "@/components/motion/text-reveal";

export function TestimonialsSection() {
  return (
    <section className="section-light overflow-hidden border-b border-section-light-foreground/10 py-20 lg:py-28">
      <Container>
        <TextReveal>
          <p className="section-label !text-section-light-foreground/50">Latest stories</p>
        </TextReveal>
        <TextReveal delay={0.08}>
          <h2 className="mega-headline mt-4 text-3xl text-section-light-foreground sm:text-4xl">
            Trusted by lounges &amp; distributors
          </h2>
        </TextReveal>
      </Container>

      <div className="mt-14">
        <HorizontalMarquee>
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="w-[min(88vw,400px)] shrink-0 border-t border-section-light-foreground/15 pt-8"
            >
              <blockquote className="text-sm leading-relaxed text-section-light-foreground/75">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold text-section-light-foreground">{t.name}</p>
                <p className="mt-1 text-xs text-section-light-foreground/50">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </HorizontalMarquee>
      </div>
    </section>
  );
}
