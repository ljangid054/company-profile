import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRIMARY_PRODUCT_IMAGE, LINEUP_IMAGE_PRIMARY, LINEUP_IMAGE_SECONDARY } from "@/config/visual";

export const metadata: Metadata = {
  title: "About Somada Hookah — heritage brass craft & export discipline",
  description:
    "Learn Somada Hookah's story of handmade desi brass hookahs—craft expertise, workshop infrastructure, quality rituals, and export-friendly packing from Somda, Rajasthan.",
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
      <section className="border-b border-border py-16 lg:py-24">
        <Container>
          <p className="section-label">About {siteConfig.name}</p>
          <h1 className="font-heading mt-4 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">
            We craft desi premium handcrafted brass hookahs—rooted in Somda, tuned for the world.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Somada sits where desi hookah culture meets honest bench craft: hand-guided finishing,
            balanced stems, and export-minded packing—so collectors and lounges receive brass that
            feels alive under warm light.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact#quote">Request quote</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">View shop</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Heading
            eyebrow="Story"
            as="h2"
            title="From workshop benches to lounge tables"
            description="Somada began as a maker-led experiment: could Rajasthan's brass discipline translate into repeatable hospitality supply—without losing warmth? Today we serve lounges, distributors, and collectors who care about feel as much as specification."
          />
          <div className="shop-card p-8">
            <h3 className="font-heading text-2xl font-semibold">Mission</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Elevate desi brass hookah culture through honest craft, transparent manufacturing, and
              export-grade reliability.
            </p>
            <Separator className="my-8" />
            <h3 className="font-heading text-2xl font-semibold">Vision</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Become the reference brass hookah atelier for premium lounges worldwide—known for finish
              character, predictable QC, and collaborative custom programs.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-secondary/30 py-16 lg:py-24">
        <Container>
          <Heading
            eyebrow="Expertise"
            as="h2"
            title="Craft depth—still unmistakably handmade"
            description="Our rhythm is bench-led: forming, chasing, polishing, and pairing stems to bowls until each Somada hookah passes draw-feel rituals—not anonymous mass lines."
          />
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
            ].map((item) => (
              <div key={item.title} className="shop-card h-full p-7">
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Heading
            eyebrow="Infrastructure"
            as="h2"
            title="Workshop built for brass—not borrowed from plastics"
            description="Polishing aisles, inspection benches, and export staging tuned for handcrafted hookahs—not borrowed plastics workflows. Lighting reveals finish defects before packing ever begins."
          />
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={LINEUP_IMAGE_SECONDARY}
              alt="Somada workshop brass hookah lineup at the bench"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-secondary/30 py-16 lg:py-24">
        <Container>
          <Heading
            eyebrow="Quality"
            as="h2"
            title="Quality standards that travel"
            description="We combine sampling logic with sensory finishing checks—because brass hookahs must feel as good as they measure."
          />
          <ul className="mt-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {[
              "Stem-to-bowl pairing checks—each hookah balanced for weight and visual harmony before finishing locks in",
              "Finish grading under daylight-balanced lamps—catching uneven patinas before they reach your lounge",
              "Draw-feel sampling with Somada hose pairings—because handcrafted brass still has to smoke beautifully",
              "Optional bench documentation for wholesale partners who want provenance alongside polish",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Heading
              eyebrow="Export"
              as="h2"
              title="Import / export capability"
              description="We support international buyers with predictable lead times, packing tailored to freight realities, and documentation aligned to wholesale expectations."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Programs can be structured as recurring lounge supply, distributor batches, or bespoke
                drops with engraving and limited finishes.
              </p>
              <p>
                Share your destination country and preferred incoterms context—we'll advise realistic
                timelines from Somda to your warehouse.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact#quote">Start export inquiry</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">Browse shop</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={LINEUP_IMAGE_PRIMARY}
                alt="Somada handcrafted brass hookah catalog lineup"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
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
        </Container>
      </section>
    </>
  );
}
