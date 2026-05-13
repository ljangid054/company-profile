"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";
import { whatsappHref } from "@/lib/whatsapp";
import Image from "next/image";
import { LINEUP_IMAGE_PRIMARY } from "@/config/visual";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  const stagger = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.09, delayChildren: 0.06 },
        },
      };

  const item = (y: number) =>
    reduce
      ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.62, ease },
          },
        };

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <CoverBackdrop scrim="hero" priority />
        <div className="animate-aurora absolute inset-0 z-[2] bg-[radial-gradient(circle_at_22%_18%,oklch(0.8_0.13_76_/_0.22),transparent_58%)]" />
        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,transparent_0%,oklch(0.06_0.02_262_/_0.5)_100%)]"
          aria-hidden
        />
      </div>

      <Container className="relative z-10 py-24 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <motion.div
            className="max-w-3xl"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={item(14)}
              className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-sm shadow-primary/10"
            >
              Rajasthan brass • Handmade desi hookahs • Export-ready packing
            </motion.p>
            <motion.h1
              variants={item(28)}
              className="mt-6 font-heading text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              <span className="text-gradient-primary">
                Premium handcrafted brass hookahs
              </span>{" "}
              <span className="text-foreground">
                for discerning lounges & collectors.
              </span>
            </motion.h1>
            <motion.p
              variants={item(22)}
              className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {siteConfig.description}
            </motion.p>
            <motion.div
              variants={item(18)}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact#quote">
                  Request quotation <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={whatsappHref()} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  WhatsApp inquiry
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/products">Explore catalog</Link>
              </Button>
            </motion.div>
            <motion.dl
              variants={item(16)}
              className="mt-12 grid max-w-xl grid-cols-2 gap-4 text-sm sm:grid-cols-3 sm:gap-5"
            >
              {[
                { dt: "Craft cluster", dd: "Somda, Rajasthan" },
                { dt: "Programs", dd: "Heritage • Lounge • Bespoke" },
                { dt: "Finish philosophy", dd: "Heritage brass, modern QC", wide: true },
              ].map((row) => (
                <div
                  key={row.dt}
                  className={`glass-panel glass-edge rounded-2xl p-4 ${row.wide ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <dt className="text-muted-foreground">{row.dt}</dt>
                  <dd className="mt-1 font-heading text-lg text-foreground">{row.dd}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
          >
            <div className="glass-edge relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/12 bg-background/40 shadow-2xl shadow-primary/10 ring-1 ring-primary/15 backdrop-blur-sm lg:aspect-[3/4]">
              <Image
                src={LINEUP_IMAGE_PRIMARY}
                alt="Somada handcrafted brass hookah lineup"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5"
                aria-hidden
              />
            </div>
            <motion.p
              className="mt-4 text-center text-xs text-muted-foreground lg:text-left"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Heritage desi silhouettes — bench-balanced for lounge & export programs.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
