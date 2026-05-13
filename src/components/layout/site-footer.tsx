import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { SITE_LOGO_IMAGE } from "@/config/visual";

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
    <footer className="border-t border-border/60 bg-card/40">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div className="relative h-14 w-40 shrink-0 sm:h-16 sm:w-44">
                <Image
                  src={SITE_LOGO_IMAGE}
                  alt={`${siteConfig.name} logo`}
                  fill
                  className="object-contain object-left"
                  sizes="176px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-xl text-foreground">{siteConfig.name}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.description}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
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
                className="underline-offset-4 hover:underline"
                href={`tel:${siteConfig.contact.phoneTel}`}
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="text-foreground">Email:</span>{" "}
              <a
                className="underline-offset-4 hover:underline"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-10 bg-border/80" />

        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Handmade desi brass hookahs from Somda, Rajasthan.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/products" className="hover:text-foreground">
              Catalog
            </Link>
            <Link href="/contact#quote" className="hover:text-foreground">
              Request quote
            </Link>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
