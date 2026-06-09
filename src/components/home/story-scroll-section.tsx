"use client";

import Image from "next/image";
import { TextReveal } from "@/components/motion/text-reveal";
import { Container } from "@/components/ui/container";
import { capabilities } from "@/content/copy";
import { LINEUP_IMAGE_PRIMARY, LINEUP_IMAGE_SECONDARY, PRIMARY_PRODUCT_IMAGE } from "@/config/visual";

const stories = [
  {
    id: "philosophy",
    label: "Philosophy",
    title: "Performance is more than appearance",
    body: "Draw-feel, stance stability, and confidence under lounge lighting. Somada carries Rajasthan brass tradition and bench discipline into every hospitality program.",
    image: LINEUP_IMAGE_PRIMARY,
    alt: "Somada brass hookah lineup",
  },
  {
    id: "craft",
    label: "Craft",
    title: "Handmade in Rajasthan",
    body: capabilities[0].body,
    image: LINEUP_IMAGE_SECONDARY,
    alt: "Somada workshop lineup",
  },
  {
    id: "innovation",
    label: "Innovation",
    title: "Export-ready by design",
    body: capabilities[2].body,
    image: PRIMARY_PRODUCT_IMAGE,
    alt: "Somada brass hookah detail",
  },
] as const;

export function StoryScrollSection() {
  return (
    <>
      {stories.map((story, index) => {
        const isLight = story.id === "craft";
        return (
        <section
          key={story.id}
          id={story.id}
          className={
            isLight
              ? "section-light border-y border-section-light-foreground/10"
              : "border-b border-border/40"
          }
        >
          <Container className="grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <TextReveal>
                <p
                  className={
                    isLight
                      ? "section-label !text-section-light-foreground/50"
                      : "section-label"
                  }
                >
                  {story.label}
                </p>
              </TextReveal>
              <TextReveal delay={0.08}>
                <h2
                  className={`mega-headline mt-6 text-3xl sm:text-4xl lg:text-5xl ${
                    isLight ? "text-section-light-foreground" : ""
                  }`}
                >
                  {story.title}
                </h2>
              </TextReveal>
              <TextReveal delay={0.14}>
                <p
                  className={`mt-6 max-w-lg text-base leading-relaxed ${
                    isLight
                      ? "text-section-light-foreground/65"
                      : "text-muted-foreground"
                  }`}
                >
                  {story.body}
                </p>
              </TextReveal>
            </div>
            <TextReveal delay={0.1} className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted/20">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </TextReveal>
          </Container>
        </section>
      );
      })}
    </>
  );
}
