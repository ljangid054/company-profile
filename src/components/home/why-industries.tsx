"use client";

import { CheckCircle2 } from "lucide-react";
import { industries } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

const reasons = [
  "Rajasthan brass tradition expressed only through handcrafted hookahs—no generic hardware catalogs",
  "Bench-balanced stems, bowls, and trays tuned for real lounge sessions—not showroom props",
  "Layered hand finishing: antique recess, mirror collars, and satin bodies that age gracefully",
  "Export-minded packing, labeling support, and shipment-ready cartons for distributors",
  "Bespoke programs—from wedding pairs and naam engraving to recurring hospitality batches",
] as const;

export function WhyChooseSection() {
  return (
    <Section coverBackground coverScrim="section" className="border-y border-border/60">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <FadeIn>
            <Heading
              eyebrow="Why Somada"
              as="h2"
              title="Built for B2B confidence—without losing soul"
              description="Every partnership starts with clarity: materials, tolerances, finishes, timelines. Then we deliver brasswork that feels unmistakably Somada."
            />
          </FadeIn>
          <ul className="mt-10 space-y-4">
            {reasons.map((r, i) => (
              <FadeIn key={r} delay={i * 0.05}>
                <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span>{r}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-border/70 bg-background/50 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Industries served
            </p>
            <p className="mt-3 font-heading text-2xl text-foreground">
              Where desi hookah culture meets hospitality discipline
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {industries.map((ind) => (
                <Badge
                  key={ind}
                  variant="secondary"
                  className="rounded-full px-4 py-2 text-xs font-medium"
                >
                  {ind}
                </Badge>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
