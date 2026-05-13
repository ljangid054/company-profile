"use client";

import Image from "next/image";
import { certifications, galleryImages } from "@/content/copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/motion/fade-in";

export function GalleryCertificationsSection() {
  return (
    <Section coverBackground coverScrim="section">
      <Container>
        <FadeIn variant="blur">
          <Heading
            eyebrow="Workshop"
            as="h2"
            title="Workshop discipline & craft traceability"
            description="Premium brass isn’t just aesthetics—it’s process control: staged QC, respectful finishing, and packing that survives freight."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {galleryImages.map((img, idx) => (
            <FadeIn key={img.src} delay={idx * 0.06}>
              <figure className="glass-panel group overflow-hidden rounded-3xl">
                <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-muted/30 to-muted/60">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <figcaption className="border-t border-border/60 px-5 py-4 text-sm text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {certifications.map((c, idx) => (
            <FadeIn key={c.name} delay={idx * 0.07}>
              <div className="glass-panel h-full rounded-3xl p-6">
                <p className="font-heading text-lg text-foreground">{c.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
