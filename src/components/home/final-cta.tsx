"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/whatsapp";
import { FadeIn } from "@/components/motion/fade-in";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCtaSection() {
  return (
    <Section
      coverBackground
      coverScrim="cta"
      className="border-t border-white/10 py-16 sm:py-20"
    >
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <FadeIn variant="left" className="max-w-2xl">
          <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
            <span className="text-gradient-primary">Ready to plan</span>{" "}
            <span className="text-foreground">your brass program?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Share quantities, target finishes, and destination country—we’ll reply with options for MOQ,
            shop drawings where applicable, and export packing.
          </p>
        </FadeIn>
        <FadeIn variant="scale" delay={0.08} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.25, ease }}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact#quote">Request quote</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.25, ease }}>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href={whatsappHref()} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </Button>
          </motion.div>
        </FadeIn>
      </Container>
    </Section>
  );
}
