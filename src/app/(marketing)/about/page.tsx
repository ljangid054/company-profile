import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/motion/fade-in";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";
import { PRIMARY_PRODUCT_IMAGE, LINEUP_IMAGE_PRIMARY, LINEUP_IMAGE_SECONDARY } from "@/config/visual";

export const metadata: Metadata = {
  title: "About Somada Hookah — heritage brass craft & export discipline",
  description:
    "Learn Somada Hookah’s story of handmade desi brass hookahs—craft expertise, workshop infrastructure, quality rituals, and export-friendly packing from Somda, Rajasthan.",
  openGraph: {
    title: "About Somada Hookah",
    description:
      "Heritage handcrafted brass hookahs, artisan-led finishing, and export-ready packing from our Somda workshop.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <CoverBackdrop scrim="hero" priority />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background via-background/88 to-background/40" />
        </div>
        <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              About {siteConfig.name}
            </p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              We craft desi premium handcrafted brass hookahs—rooted in Somda, Rajasthan, tuned for the world.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Somada sits where desi hookah culture meets honest bench craft: hand-guided finishing, balanced stems, and export-minded packing—so collectors and lounges receive brass that feels alive under warm light.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact#quote">Request quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">View catalog</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Section coverBackground coverScrim="subtle">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <Heading
              eyebrow="Story"
              as="h2"
              title="From workshop benches to lounge tables"
              description="Somada began as a maker-led experiment: could Rajasthan’s brass discipline translate into repeatable hospitality supply—without losing warmth? Today we serve lounges, distributors, and collectors who care about feel as much as specification."
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-2xl border border-border/70 bg-card/40 p-8">
              <h3 className="font-heading text-2xl text-foreground">Mission</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Elevate desi brass hookah culture through honest craft, transparent manufacturing, and export-grade reliability.
              </p>
              <Separator className="my-8 bg-border/70" />
              <h3 className="font-heading text-2xl text-foreground">Vision</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Become the reference brass hookah atelier for premium lounges worldwide—known for finish character,
                predictable QC, and collaborative custom programs.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section coverBackground coverScrim="section" className="border-y border-border/60">
        <Container>
          <FadeIn>
            <Heading
              eyebrow="Expertise"
              as="h2"
              title="Craft depth—still unmistakably handmade"
              description="Our rhythm is bench-led: forming, chasing, polishing, and pairing stems to bowls until each Somada hookah passes draw-feel rituals—not anonymous mass lines."
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Brass honesty",
                body: "Solid brass hookah bodies—chosen for weight, acoustic warmth, and patina stories that aluminum copies cannot fake.",
              },
              {
                title: "Assembly feel",
                body: "Stem torque, purge ergonomics, and hose transitions tuned by artisans who smoke-test profiles—not spreadsheets alone.",
              },
              {
                title: "Partner storytelling",
                body: "Finish references, bench notes, and packing shots so distributors and lounges can trust what arrives after freight.",
              },
            ].map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.06}>
                <div className="h-full rounded-2xl border border-border/70 bg-background/50 p-7">
                  <h3 className="font-heading text-xl text-foreground">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section coverBackground coverScrim="subtle">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <Heading
              eyebrow="Infrastructure"
              as="h2"
              title="Workshop built for brass—not borrowed from plastics"
              description="Polishing aisles, inspection benches, and export staging tuned for handcrafted hookahs—not borrowed plastics workflows. Lighting reveals finish defects before packing ever begins."
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-muted/30">
              <Image
                src={LINEUP_IMAGE_SECONDARY}
                alt="Somada workshop brass hookah lineup at the bench"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section coverBackground coverScrim="section">
        <Container>
          <FadeIn>
            <Heading
              eyebrow="Quality"
              as="h2"
              title="Quality standards that travel"
              description="We combine sampling logic with sensory finishing checks—because brass hookahs must feel as good as they measure."
            />
          </FadeIn>
          <ul className="mt-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {[
              "Stem-to-bowl pairing checks—each hookah balanced for weight and visual harmony before finishing locks in",
              "Finish grading under daylight-balanced lamps—catching uneven patinas before they reach your lounge",
              "Draw-feel sampling with Somada hose pairings—because handcrafted brass still has to smoke beautifully",
              "Optional bench documentation for wholesale partners who want provenance alongside polish",
            ].map((line, idx) => (
              <FadeIn key={line} delay={idx * 0.05}>
                <li className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{line}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </Section>

      <Section coverBackground coverScrim="subtle" className="border-t border-border/60">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <Heading
              eyebrow="Export"
              as="h2"
              title="Import / export capability"
              description="We support international buyers with predictable lead times, packing tailored to freight realities, and documentation aligned to wholesale expectations."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Programs can be structured as recurring lounge supply, distributor batches, or bespoke drops with engraving and limited finishes.
              </p>
              <p>
                Share your destination country and preferred incoterms context—we’ll advise realistic timelines from Somda to your warehouse.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact#quote">Start export inquiry</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">Browse handcrafted catalog</Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="grid gap-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/70">
                <Image
                  src={LINEUP_IMAGE_PRIMARY}
                  alt="Somada handcrafted brass hookah catalog lineup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/70">
                <Image
                  src={PRIMARY_PRODUCT_IMAGE}
                  alt="Nawabi Khas heritage brass hookah — hero product detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
