"use client";

import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="border-t border-border bg-primary py-16 text-primary-foreground lg:py-20">
      <Container className="max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-normal sm:text-4xl">Follow our journey</h2>
        <p className="mt-4 text-sm text-primary-foreground/85">
          New finishes, export programs, and workshop drops from Somada Hookah.
        </p>

        <form
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Email address"
            required
            className="h-12 flex-1 rounded-none border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button
            type="submit"
            className="h-12 rounded-none bg-primary-foreground px-8 text-primary hover:opacity-90"
          >
            Subscribe
          </Button>
        </form>
      </Container>
    </section>
  );
}
