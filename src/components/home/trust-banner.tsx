"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { LINEUP_IMAGE_PRIMARY } from "@/config/visual";
import Image from "next/image";

export function TrustBannerSection() {
  return (
    <section className="border-b border-border/40 bg-muted/20">
      <Container className="grid items-center gap-8 py-12 lg:grid-cols-[1fr_200px] lg:py-16">
        <TextReveal>
          <p className="text-lg font-medium leading-snug text-foreground sm:text-xl">
            <span className="font-bold">Rajasthan brass is trustware.</span> The transition from
            commodity hookahs to bench-verified hospitality supply is underway.{" "}
            <Link href="/about" className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70">
              Learn how Somada powers lounge-ready brass
              <ArrowRight className="size-3.5" />
            </Link>
          </p>
        </TextReveal>
        <div className="relative hidden aspect-square overflow-hidden rounded-lg bg-muted lg:block">
          <Image src={LINEUP_IMAGE_PRIMARY} alt="" fill className="object-cover opacity-80" sizes="200px" />
        </div>
      </Container>
    </section>
  );
}
