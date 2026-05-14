import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { CompanyIntroSection } from "@/components/home/company-intro";
import { FeaturedProductsSection } from "@/components/home/featured-products";
import { WhyChooseSection } from "@/components/home/why-industries";
import { GalleryCertificationsSection } from "@/components/home/gallery-certifications";
import { TestimonialsSection } from "@/components/home/testimonials";
import { FinalCtaSection } from "@/components/home/final-cta";
import { getFeaturedProductsMerged } from "@/lib/products-merged";
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

export default async function HomePage() {
  const featured = await getFeaturedProductsMerged();

  return (
    <>
      <HeroSection />
      <CompanyIntroSection />
      <FeaturedProductsSection products={featured} />
      <WhyChooseSection />
      <GalleryCertificationsSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
