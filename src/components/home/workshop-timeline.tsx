"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { LINEUP_IMAGE_SECONDARY } from "@/config/visual";

const milestones = [
  {
    tag: "Bench QA",
    title: "Draw-feel sampling introduced",
    body: "Every Somada hookah passes stability pulls, visual finish grading, and draw-feel checks before packing.",
  },
  {
    tag: "Export",
    title: "Freight-ready packing playbooks",
    body: "Anti-tarnish wraps, reinforced cartons, and distributor-friendly documentation for international programs.",
  },
  {
    tag: "Bespoke",
    title: "Wedding & venue craft intake",
    body: "Monograms, naam engraving, and hospitality batches move through Somada craft leads with honest timelines.",
  },
] as const;

export function WorkshopTimelineSection() {
  return (
    <section id="workshop" className="border-b border-border/40 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <TextReveal>
              <p className="section-label">Building the workshop</p>
            </TextReveal>
            <TextReveal delay={0.08}>
              <h2 className="mega-headline mt-6 text-3xl sm:text-4xl lg:text-5xl">
                The craft powering hospitality brass
              </h2>
            </TextReveal>
            <TextReveal delay={0.14}>
              <p className="mt-6 max-w-lg text-muted-foreground">
                Somada enables repeatable lounge supply, transparent finishing, and export-grade
                reliability—while keeping the warmth of handmade Rajasthan brass.
              </p>
            </TextReveal>
            <TextReveal delay={0.18}>
              <Link href="/about" className="link-arrow mt-8 inline-flex text-foreground underline">
                Explore workshop upgrades
                <ArrowRight className="size-4" />
              </Link>
            </TextReveal>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden bg-muted/30">
            <Image
              src={LINEUP_IMAGE_SECONDARY}
              alt="Somada workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <StaggerReveal className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {milestones.map((m) => (
            <StaggerItem key={m.tag}>
              <article className="border-t border-border/50 pt-6">
                <p className="section-label">{m.tag}</p>
                <h3 className="display-heading mt-4 text-lg">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                <span className="link-arrow mt-4 inline-flex text-sm text-muted-foreground">
                  Learn more
                  <ArrowRight className="size-3.5" />
                </span>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
