import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/whatsapp";

export function FinalCtaSection() {
  return (
    <Section
      coverBackground
      coverScrim="cta"
      className="border-t border-border/60 py-16 sm:py-20"
    >
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
            Ready to plan your brass program?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Share quantities, target finishes, and destination country—we’ll reply with options for MOQ,
            shop drawings where applicable, and export packing.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/contact#quote">Request quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href={whatsappHref()} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
