"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { SITE_LOGO_IMAGE } from "@/config/visual";
import { FadeIn } from "@/components/motion/fade-in";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const fullAddress = [
    siteConfig.contact.addressLine1,
    siteConfig.contact.addressLine2,
    `${siteConfig.contact.city}, ${siteConfig.contact.region} ${siteConfig.contact.postalCode}`,
    siteConfig.contact.country,
  ].join(", ");

  return (
    <footer className="relative border-t border-white/10 bg-card/35 shadow-[0_-32px_120px_-80px_oklch(0.8_0.13_76_/_0.12)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FadeIn variant="blur" className="lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <motion.div
                className="relative h-14 w-40 shrink-0 sm:h-16 sm:w-44"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <Image
                  src={SITE_LOGO_IMAGE}
                  alt={`${siteConfig.name} logo`}
                  fill
                  className="object-contain object-left"
                  sizes="176px"
                />
              </motion.div>
              <div className="min-w-0">
                <p className="font-heading text-xl text-foreground">{siteConfig.name}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.description}
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn variant="up" delay={0.06}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block transition-all duration-300 hover:translate-x-0.5 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn variant="up" delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Workshop
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {fullAddress}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="text-foreground">Owner:</span> {siteConfig.contact.ownerName}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="text-foreground">Phone:</span>{" "}
              <a
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                href={`tel:${siteConfig.contact.phoneTel}`}
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="text-foreground">Email:</span>{" "}
              <a
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </FadeIn>
        </div>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-border to-transparent" />

        <FadeIn variant="scale" delay={0.04}>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Handmade desi brass hookahs from Somda, Rajasthan.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/products" className="transition-colors hover:text-foreground">
                Catalog
              </Link>
              <Link href="/contact#quote" className="transition-colors hover:text-foreground">
                Request quote
              </Link>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                Instagram
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </footer>
  );
}
