"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { TextReveal } from "@/components/motion/text-reveal";

const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#quote", label: "Quote" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <TextReveal>
            <div className="flex items-start gap-4">
              <BrandLogo framed className="h-12 w-12" />
              <div>
                <p className="text-lg font-bold tracking-tight">{siteConfig.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="mega-headline mt-8 text-2xl sm:text-3xl">Get in touch</p>
            <p className="mt-4 text-sm text-muted-foreground">
              <a href={`tel:${siteConfig.contact.phoneTel}`} className="hover:underline">
                {siteConfig.contact.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
          </TextReveal>

          <TextReveal delay={0.08}>
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Instagram
              </a>
            </nav>
            <p className="mt-10 text-xs text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. Handmade in Somda, Rajasthan.
            </p>
          </TextReveal>
        </div>
      </Container>
    </footer>
  );
}
