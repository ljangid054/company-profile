"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { LINEUP_IMAGE_PRIMARY, LINEUP_IMAGE_SECONDARY, PRIMARY_PRODUCT_IMAGE } from "@/config/visual";

const stack = [
  {
    name: "Heritage Desi",
    slug: "heritage-desi",
    description:
      "Traditional tall silhouettes with hand-hammered collars—trusted by collectors and premium lounges who want unmistakable desi character under warm light.",
    image: LINEUP_IMAGE_PRIMARY,
    stats: [
      { label: "Product lines", value: "3+" },
      { label: "Finish tiers", value: "5" },
    ],
  },
  {
    name: "Premium Handcrafted",
    slug: "premium-handcrafted",
    description:
      "Signature Somada programs where patina, collar polish, and proportional balance are tuned like furniture—each hookah signed off at the bench.",
    image: PRIMARY_PRODUCT_IMAGE,
    stats: [
      { label: "Bench QA", value: "100%" },
      { label: "Export ready", value: "Yes" },
    ],
  },
  {
    name: "Lounge & Hospitality",
    slug: "lounge-series",
    description:
      "Built for heavy rotation and freight—consistent draw character, stable trays, and packing that survives export without drama.",
    image: LINEUP_IMAGE_SECONDARY,
    stats: [
      { label: "MOQ flexible", value: "✓" },
      { label: "Regions served", value: "12+" },
    ],
  },
] as const;

export function ProductStackSection() {
  return (
    <section id="stack" className="border-b border-border/40 py-20 lg:py-28">
      <Container>
        <TextReveal>
          <p className="section-label">The brass hospitality stack</p>
        </TextReveal>
        <TextReveal delay={0.08}>
          <h2 className="mega-headline mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            The Somada craft stack
          </h2>
        </TextReveal>
        <TextReveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Our vertically integrated workshop converts your brief into successful hospitality
            outcomes—from sampling and finishing to QC and export settlement.
          </p>
        </TextReveal>
        <TextReveal delay={0.16}>
          <Link href="/products" className="link-arrow mt-6 inline-flex text-foreground underline">
            See all products
            <ArrowRight className="size-4" />
          </Link>
        </TextReveal>

        <StaggerReveal className="mt-16 space-y-20" stagger={0.12}>
          {stack.map((item, index) => (
            <StaggerItem key={item.slug}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <h3 className="display-heading text-2xl sm:text-3xl">{item.name}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border/50 pt-8">
                    {item.stats.map((s) => (
                      <div key={s.label}>
                        <p className="section-label !text-[10px]">{s.label}</p>
                        <p className="stat-value mt-1 text-3xl">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/products/${item.slug}`}
                    className="link-arrow mt-8 inline-flex text-foreground underline"
                  >
                    Explore {item.name}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden bg-muted/30 ${
                    index % 2 === 1 ? "lg:[direction:ltr]" : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
