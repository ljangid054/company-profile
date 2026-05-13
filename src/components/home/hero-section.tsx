import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";
import { whatsappHref } from "@/lib/whatsapp";
import Image from "next/image";
import { LINEUP_IMAGE_PRIMARY } from "@/config/visual";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <div className="absolute inset-0">
        <CoverBackdrop scrim="hero" priority />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_22%_18%,oklch(0.74_0.12_71_/_0.2),transparent_58%)]" />
      </div>

      <Container className="relative z-10 py-24 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Rajasthan brass • Handmade desi hookahs • Export-ready packing
            </p>
            <h1 className="mt-5 font-heading text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Premium handcrafted brass hookahs for discerning lounges & collectors.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact#quote">
                  Request quotation <ArrowRight className="size-4" />
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
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-background/40 p-4 backdrop-blur">
                <dt className="text-muted-foreground">Craft cluster</dt>
              <dd className="mt-1 font-heading text-lg text-foreground">
                Somda, Rajasthan
              </dd>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/40 p-4 backdrop-blur">
                <dt className="text-muted-foreground">Programs</dt>
                <dd className="mt-1 font-heading text-lg text-foreground">
                  Heritage • Lounge • Bespoke
                </dd>
              </div>
              <div className="col-span-2 rounded-xl border border-border/60 bg-background/40 p-4 backdrop-blur sm:col-span-1">
                <dt className="text-muted-foreground">Finish philosophy</dt>
                <dd className="mt-1 font-heading text-lg text-foreground">
                  Heritage brass, modern QC
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70 bg-background/30 shadow-2xl shadow-primary/5 ring-1 ring-border/40 backdrop-blur-sm lg:aspect-[3/4]">
              <Image
                src={LINEUP_IMAGE_PRIMARY}
                alt="Somada handcrafted brass hookah lineup"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
                aria-hidden
              />
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground lg:text-left">
              Heritage desi silhouettes — bench-balanced for lounge & export programs.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
