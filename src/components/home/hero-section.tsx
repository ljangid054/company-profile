"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/text-reveal";
import { whatsappHref } from "@/lib/whatsapp";
import { SITE_COVER_IMAGE } from "@/config/visual";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden border-b border-border/40 py-24">
      <div className="absolute inset-0">
        <CoverBackdrop scrim="hero" priority />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_18%_22%,oklch(0.52_0.22_264_/_0.14),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-background/20 via-transparent to-background/90"
          aria-hidden
        />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <div>
            <TextReveal>
              <p className="section-label !text-primary">Somada · Somda, Rajasthan</p>
            </TextReveal>
            <TextReveal delay={0.06}>
              <h1 className="mega-headline mt-5 max-w-4xl text-[clamp(2.25rem,6.5vw,4.75rem)]">
                Building the era of handcrafted hospitality
              </h1>
            </TextReveal>
            <TextReveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {siteConfig.description}
              </p>
            </TextReveal>
            <TextReveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/contact#quote">
                    Get quote
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link href="/products">Explore products</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
                  <a href={whatsappHref()} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </TextReveal>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/50 bg-background/30 shadow-2xl shadow-black/30 ring-1 ring-white/10 backdrop-blur-sm lg:aspect-[3/4]">
              <Image
                src={SITE_COVER_IMAGE}
                alt="Somada brass hookah craftsmanship — workshop cover"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 380px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
                aria-hidden
              />
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground lg:text-left">
              Hand-finished brass — heritage silhouettes built for lounge &amp; export programs.
            </p>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="relative z-10 mt-16 flex items-center justify-center gap-3 text-muted-foreground"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="section-label !text-muted-foreground">Scroll to explore</span>
        <ArrowDown className="size-4 motion-safe:animate-bounce" />
      </motion.div>
    </section>
  );
}
