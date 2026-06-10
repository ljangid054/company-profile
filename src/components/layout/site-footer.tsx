"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { whatsappHref } from "@/lib/whatsapp";

const quickLinks = [
  { href: "/products", label: "Our Products" },
  { href: "/about", label: "Our Company" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#quote", label: "Request Quote" },
] as const;

const supportLinks: { href: string; label: string; external?: boolean }[] = [
  { href: whatsappHref(), label: "WhatsApp Support", external: true },
  { href: "/contact", label: "FAQs & Inquiries" },
  { href: "/contact", label: "Terms & Conditions" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background pb-16 pt-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo framed className="h-11 w-11" />
              <p className="font-heading text-lg font-semibold">{siteConfig.name}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold">Contact Us</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>
                <a href={`tel:${siteConfig.contact.phoneTel}`} className="hover:text-primary">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="leading-relaxed">
                {siteConfig.contact.addressLine1},
                <br />
                {siteConfig.contact.addressLine2},
                <br />
                {siteConfig.contact.city}, {siteConfig.contact.region}{" "}
                {siteConfig.contact.postalCode}
              </p>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-block pt-2 text-primary hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Handmade in Somda, Rajasthan.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-primary">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Privacy policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
