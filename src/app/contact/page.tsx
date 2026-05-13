import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/contact/contact-form";
import { whatsappHref } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/ui/brand-logo";

export const metadata: Metadata = {
  title: "Contact Somada Hookah — quotes, export, custom brass programs",
  description:
    "Contact Somada Hookah for handcrafted desi brass hookah quotations, bespoke orders, and export programs. WhatsApp, email, phone, and contact form.",
  openGraph: {
    title: "Contact Somada Hookah",
    description:
      "Reach our workshop desk for MOQ, finishes, packing, and lead times.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const fullAddress = [
    siteConfig.contact.addressLine1,
    siteConfig.contact.addressLine2,
    `${siteConfig.contact.city}, ${siteConfig.contact.region} ${siteConfig.contact.postalCode}`,
    siteConfig.contact.country,
  ].join("\n");

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneTel,
    email: siteConfig.contact.email,
    founder: {
      "@type": "Person",
      name: siteConfig.contact.ownerName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.contact.addressLine1}, ${siteConfig.contact.addressLine2}`,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.country,
    },
    openingHours: siteConfig.contact.businessHours
      .map((h) => `${h.days}: ${h.hours}`)
      .join(" • "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
    <Section coverBackground coverScrim="section" className="pt-12 sm:pt-16">
      <Container>
        <Heading
          eyebrow="Contact"
          as="h1"
          title="Talk with the Somada workshop desk"
          description="Fastest responses arrive with clear quantities, destination country, and target finishes. We reply with pragmatic MOQs, timelines, and packing notes."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div id="quote" className="scroll-mt-28 space-y-8">
            <div>
              <BrandLogo className="mb-5 h-10 w-36" />
              <h2 className="font-heading text-2xl text-foreground">
                Request quotation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Prefer WhatsApp for attachments? Use the floating button—our team routes workshop photos and packing specs there daily.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="min-h-[420px] animate-pulse rounded-2xl border border-border/70 bg-muted/20" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <h2 className="font-heading text-xl text-foreground">Workshop & owner</h2>
              <Separator className="my-6 bg-border/70" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Proprietor:</span>{" "}
                {siteConfig.contact.ownerName}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Call or WhatsApp for catalog photos, finishes, and dispatch timelines from our Somda workshop.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <h2 className="font-heading text-xl text-foreground">Direct lines</h2>
              <Separator className="my-6 bg-border/70" />
              <ul className="space-y-5 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Phone
                    </p>
                    <a
                      className="mt-1 block text-base text-foreground underline-offset-4 hover:underline"
                      href={`tel:${siteConfig.contact.phoneTel}`}
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Email
                    </p>
                    <a
                      className="mt-1 block text-base text-foreground underline-offset-4 hover:underline"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-[#25D366]" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      WhatsApp
                    </p>
                    <Button asChild className="mt-3 w-full sm:w-auto" variant="outline">
                      <a href={whatsappHref()} target="_blank" rel="noreferrer">
                        Open WhatsApp chat
                      </a>
                    </Button>
                    <p className="mt-2 text-sm text-muted-foreground">{siteConfig.contact.phoneDisplay}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <h2 className="font-heading text-xl text-foreground">Location</h2>
              <Separator className="my-6 bg-border/70" />
              <div className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <pre className="whitespace-pre-wrap font-sans">{fullAddress}</pre>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <h2 className="font-heading text-xl text-foreground">Business hours</h2>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {siteConfig.contact.businessHours.map((row) => (
                      <li key={row.days} className="flex justify-between gap-6">
                        <span className="text-foreground">{row.days}</span>
                        <span>{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/20">
              <iframe
                title="Somada Hookah on Google Maps"
                src={siteConfig.contact.googleMapsEmbedSrc}
                className="aspect-[16/10] min-h-[280px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
                Village Somda, behind Thakur Ji Temple — pin {siteConfig.contact.postalCode}. Adjust the map pin in{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">src/config/site.ts</code>{" "}
                if you need the exact workshop gate on Google Maps.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/10 p-6 text-sm text-muted-foreground">
              <p>
                Export buyers: include incoterms preference and destination port context—we advise realistic timelines from our Somda workshop to your warehouse.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/products">Browse catalog</Link>
                </Button>
                <Button asChild>
                  <Link href="/about">Read our story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}
