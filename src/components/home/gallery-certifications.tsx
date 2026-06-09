"use client";

import Image from "next/image";
import { certifications, galleryImages } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { TextReveal } from "@/components/motion/text-reveal";

export function GalleryCertificationsSection() {
  return (
    <Section>
      <Container>
        <TextReveal>
          <Heading
            eyebrow="Workshop"
            as="h2"
            title="Workshop discipline & craft traceability"
            description="Premium brass isn't just aesthetics—it's process control: staged QC, respectful finishing, and packing that survives freight."
          />
        </TextReveal>

        <StaggerReveal className="mt-14 grid gap-5 md:grid-cols-2">
          {galleryImages.map((img) => (
            <StaggerItem key={img.src}>
              <figure className="surface-card surface-card-hover group overflow-hidden">
                <div className="relative aspect-[16/10] w-full bg-muted/30">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <figcaption className="border-t border-border/50 px-5 py-4 text-sm text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.07}>
          {certifications.map((c) => (
            <StaggerItem key={c.name}>
              <div className="surface-card surface-card-hover h-full p-6">
                <p className="display-heading text-lg text-foreground">{c.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
