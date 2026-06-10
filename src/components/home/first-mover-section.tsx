"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LINEUP_IMAGE_SECONDARY } from "@/config/visual";

export function FirstMoverSection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={LINEUP_IMAGE_SECONDARY}
                alt="Somada workshop craftsmanship"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="lg:order-1">
            <h2 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
              All-Handcrafted Ingredients
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Every Somada hookah is bench-balanced and finish-verified—hand-guided polishing,
              balanced stems, and export-minded packing. We create brass programs formulated only
              with honest workshop discipline.
            </p>
            <Link
              href="/contact#quote"
              className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4"
            >
              Read More
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
