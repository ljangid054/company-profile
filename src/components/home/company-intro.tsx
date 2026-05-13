"use client";

import { siteConfig } from "@/config/site";
import { capabilities } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CompanyIntroSection() {
  return (
    <Section coverBackground coverScrim="section">
      <Container>
        <FadeIn variant="blur">
          <Heading
            eyebrow="Company"
            as="h2"
            title="Desi craft, international standards"
            description={`${siteConfig.name} handcrafts desi brass hookahs in Somda, Rajasthan—heritage silhouettes, bespoke weddings, and lounge-ready batches guided by artisans who still think in patina, draw-feel, and storyteller brass.`}
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {capabilities.map((cap, idx) => (
            <FadeIn key={cap.title} delay={idx * 0.06} variant="scale">
              <Card className="h-full border-primary/15 bg-card/60">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{cap.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {cap.body}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
