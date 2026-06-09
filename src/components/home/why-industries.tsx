"use client";

import { CheckCircle2 } from "lucide-react";
import { industries } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { TextReveal } from "@/components/motion/text-reveal";
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
    <Section tone="cream">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <TextReveal>
            <Heading
              eyebrow="Why Somada"
              as="h2"
              tone="cream"
              title="Built for B2B confidence—without losing soul"
              description="Every partnership starts with clarity: materials, tolerances, finishes, timelines. Then we deliver brasswork that feels unmistakably Somada."
            />
          </TextReveal>

          <ul className="mt-10 space-y-4">
            <StaggerReveal stagger={0.06}>
              {reasons.map((r) => (
                <StaggerItem key={r}>
                  <li className="flex gap-3 text-sm leading-relaxed text-section-cream-foreground/70">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{r}</span>
                  </li>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </ul>
        </div>

        <TextReveal delay={0.1}>
          <div className="surface-card p-8 lg:p-10">
            <p className="eyebrow text-primary">Industries served</p>
            <p className="display-heading mt-4 text-2xl text-section-cream-foreground">
              Where desi hookah culture meets hospitality discipline
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {industries.map((ind) => (
                <Badge
                  key={ind}
                  variant="secondary"
                  className="rounded-full border border-section-cream-foreground/10 bg-section-cream-foreground/5 px-4 py-2 text-xs font-medium text-section-cream-foreground"
                >
                  {ind}
                </Badge>
              ))}
            </div>
          </div>
        </TextReveal>
      </Container>
    </Section>
  );
}
