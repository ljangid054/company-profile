"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { whatsappHref } from "@/lib/whatsapp";

export function FinalCtaSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <TextReveal>
          <h2 className="mega-headline text-3xl sm:text-4xl">Ready to plan your program?</h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/contact#quote" className="link-arrow text-foreground underline">
              Request quote
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="link-arrow text-muted-foreground"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </div>
        </TextReveal>
      </Container>
    </section>
  );
}
