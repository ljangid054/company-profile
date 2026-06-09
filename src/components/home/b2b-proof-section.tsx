"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certifications, galleryImages } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";

const stats = [
  { value: "6+", label: "Product lines" },
  { value: "100%", label: "Hand finished" },
  { value: "Export", label: "Ready packing" },
  { value: "Somda", label: "Rajasthan workshop" },
] as const;

export function B2BProofSection() {
  return (
    <section id="proof" className="border-b border-border/40 py-20 lg:py-28">
      <Container>
        <TextReveal>
          <p className="section-label">Infrastructure for global hospitality</p>
        </TextReveal>
        <TextReveal delay={0.08}>
          <h2 className="mega-headline mt-6 max-w-4xl text-3xl sm:text-4xl lg:text-5xl">
            Bench discipline distributors can verify
          </h2>
        </TextReveal>
        <TextReveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Premium brass isn&apos;t just aesthetics—it&apos;s process control: staged QC,
            respectful finishing, and packing that survives freight.
          </p>
        </TextReveal>

        <StaggerReveal className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="border-t border-border/50 pt-6">
                <p className="stat-value">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal className="mt-16 grid gap-px bg-border/30 sm:grid-cols-2" stagger={0.08}>
          {galleryImages.slice(0, 4).map((img) => (
            <StaggerItem key={img.src}>
              <figure className="group bg-background">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="border-t border-border/40 px-4 py-3 text-xs text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.07}>
          {certifications.map((cert) => (
            <StaggerItem key={cert.name}>
              <div className="border-t border-border/50 pt-6">
                <h3 className="display-heading text-lg">{cert.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {cert.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <TextReveal delay={0.1} className="mt-12">
          <Link href="/contact#quote" className="link-arrow text-foreground underline">
            Get the workshop report
            <ArrowRight className="size-4" />
          </Link>
        </TextReveal>
      </Container>
    </section>
  );
}
