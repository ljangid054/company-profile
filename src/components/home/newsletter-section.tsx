"use client";

import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="section-light border-b border-section-light-foreground/10 py-20 lg:py-28">
      <Container className="max-w-2xl">
        <TextReveal>
          <p className="section-label !text-section-light-foreground/50">Newsletter</p>
        </TextReveal>
        <TextReveal delay={0.08}>
          <h2 className="mega-headline mt-4 text-3xl text-section-light-foreground sm:text-4xl">
            Follow our journey
          </h2>
        </TextReveal>
        <TextReveal delay={0.14}>
          <p className="mt-4 text-section-light-foreground/60">
            New finishes, export programs, and workshop drops from Somada Hookah.
          </p>
        </TextReveal>

        <form
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Email address"
            required
            className="h-12 flex-1 rounded-none border-section-light-foreground/20 bg-transparent text-section-light-foreground"
          />
          <Button
            type="submit"
            className="h-12 rounded-none bg-section-light-foreground px-8 text-section-light hover:opacity-90"
          >
            Subscribe
          </Button>
        </form>
        <p className="mt-4 text-xs text-section-light-foreground/45">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </Container>
    </section>
  );
}
