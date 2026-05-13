import { Plus_Jakarta_Sans, Playfair_Display, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils-nav";
import { SITE_LOGO_IMAGE, LINEUP_IMAGE_PRIMARY } from "@/config/visual";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/sonner";

const dmSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: SITE_LOGO_IMAGE, type: "image/png" }],
    apple: [{ url: SITE_LOGO_IMAGE, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale.replace("_", "-"),
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: LINEUP_IMAGE_PRIMARY, alt: `${siteConfig.name} — handcrafted brass hookahs` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [absoluteUrl(LINEUP_IMAGE_PRIMARY)],
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(SITE_LOGO_IMAGE),
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${siteConfig.contact.addressLine1}, ${siteConfig.contact.addressLine2}`,
        addressLocality: siteConfig.contact.city,
        addressRegion: siteConfig.contact.region,
        postalCode: siteConfig.contact.postalCode,
        addressCountry: siteConfig.contact.country,
      },
      sameAs: [siteConfig.social.instagram],
      founder: {
        "@type": "Person",
        name: siteConfig.contact.ownerName,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: siteConfig.contact.phoneTel,
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${display.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
