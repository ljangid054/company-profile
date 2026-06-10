"use client";

import { testimonials } from "@/content/copy";
import { Container } from "@/components/ui/container";

export function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
            Client Testimonials
          </h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <figure key={t.name} className="text-center">
              <blockquote className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-heading text-base font-semibold text-foreground">{t.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
