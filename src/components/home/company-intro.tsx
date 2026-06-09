"use client";

import { siteConfig } from "@/config/site";
import { capabilities } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { TextReveal } from "@/components/motion/text-reveal";

export function CompanyIntroSection() {
  return (
    <Section tone="cream">
      <Container>
        <TextReveal>
          <Heading
            eyebrow="Company"
            as="h2"
            tone="cream"
            title="Desi craft, international standards"
            description={`${siteConfig.name} handcrafts desi brass hookahs in Somda, Rajasthan—heritage silhouettes, bespoke weddings, and lounge-ready batches guided by artisans who still think in patina, draw-feel, and storyteller brass.`}
          />
        </TextReveal>

        <StaggerReveal className="mt-14 grid gap-5 md:grid-cols-2">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.title}>
              <article className="surface-card surface-card-hover h-full p-8">
                <h3 className="display-heading text-xl text-section-cream-foreground">
                  {cap.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-section-cream-foreground/65">
                  {cap.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
