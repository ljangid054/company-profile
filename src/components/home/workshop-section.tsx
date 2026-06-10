"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";

export function WorkshopSection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <Container className="max-w-3xl text-center">
        <p className="text-xs text-muted-foreground">2025 . 06 . 10</p>
        <h2 className="font-heading mt-4 text-3xl font-normal text-foreground sm:text-4xl">
          New craft from Somda, Rajasthan
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          From heritage desi silhouettes trusted by collectors—to lounge series engineered for
          rotation, export packing, and distributor confidence—Somada is building the complete brass
          hospitality stack, bench by bench.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4"
        >
          Read More
        </Link>
      </Container>
    </section>
  );
}
