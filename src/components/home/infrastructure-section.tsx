"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LINEUP_IMAGE_PRIMARY } from "@/config/visual";

export function InfrastructureSection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={LINEUP_IMAGE_PRIMARY}
              alt="Somada brass hookah workshop lineup"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
              Our Craft
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Somada crafts premium desi brass hookahs in Somda, Rajasthan—heritage silhouettes,
              bespoke weddings, and lounge-grade hospitality lines for collectors and partners
              across India and abroad.
            </p>
            <Link
              href="/about"
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
