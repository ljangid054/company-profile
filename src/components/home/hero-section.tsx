"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { LetterReveal } from "@/components/motion/letter-reveal";
import { LINEUP_IMAGE_PRIMARY, PRIMARY_PRODUCT_IMAGE } from "@/config/visual";

const HERO_DESCRIPTION =
  "Premium desi brass hookahs handcrafted in Somda, Rajasthan—for lounges, collectors, and export partners.";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background pb-12 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-8">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <motion.p
              className="drinkify-meet-line"
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={reduce ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              Meet With
            </motion.p>

            <motion.h1
              className="mt-6 font-heading text-[clamp(2.25rem,8vw,4.48rem)] font-normal leading-[1.22] text-foreground sm:mt-8"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
            >
              <span className="drinkify-hero-gold">Sweet Elegant</span>
              {" "}Fine{" "}
              <LetterReveal text="Brass Craft" delay={0.35} />
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-foreground sm:mt-6 sm:text-lg lg:mx-0"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.55 }}
            >
              {HERO_DESCRIPTION}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.7 }}
            >
              <Link href="/products" className="drinkify-btn mt-8 inline-block sm:mt-10">
                View More
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative flex min-h-[280px] items-center justify-center sm:min-h-[360px] lg:min-h-[480px] lg:justify-end"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.1] lg:justify-end">
              <div className="relative h-full w-full max-w-lg">
                <Image
                  src={LINEUP_IMAGE_PRIMARY}
                  alt=""
                  fill
                  className="object-contain object-center lg:object-right"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  aria-hidden
                />
              </div>
            </div>
            <div className="relative aspect-square w-[min(100%,320px)] sm:w-[min(100%,380px)] lg:max-w-md">
              <Image
                src={PRIMARY_PRODUCT_IMAGE}
                alt="Somada handcrafted brass hookah"
                fill
                priority
                className="drinkify-product-shadow object-contain object-center"
                sizes="(max-width: 1024px) 90vw, 400px"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
