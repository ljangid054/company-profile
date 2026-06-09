import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBannerSection } from "@/components/home/trust-banner";
import { InfrastructureSection } from "@/components/home/infrastructure-section";
import { ProductStackSection } from "@/components/home/product-stack-section";
import { EcosystemGridSection } from "@/components/home/ecosystem-grid";
import { WorkshopTimelineSection } from "@/components/home/workshop-timeline";
import { FirstMoverSection } from "@/components/home/first-mover-section";
import { BuildCtaSection } from "@/components/home/build-cta-section";
import { PulseSection } from "@/components/home/pulse-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FinalCtaSection } from "@/components/home/final-cta";
import { GalleryCertificationsSection } from "@/components/home/gallery-certifications";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Premium handcrafted desi brass hookahs — Somada Hookah",
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Premium handcrafted brass hookahs`,
    description: siteConfig.description,
    url: "/",
  },
};

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBannerSection />
      <InfrastructureSection />
      <ProductStackSection />
      <EcosystemGridSection />
      <WorkshopTimelineSection />
      <FirstMoverSection />
      <BuildCtaSection />
      <PulseSection />
      <GalleryCertificationsSection />
      <NewsletterSection />
      <FinalCtaSection />
    </>
  );
}
