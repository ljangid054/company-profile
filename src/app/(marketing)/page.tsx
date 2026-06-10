import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { BestSellersSection } from "@/components/home/best-sellers-section";
import { InfrastructureSection } from "@/components/home/infrastructure-section";
import { FirstMoverSection } from "@/components/home/first-mover-section";
import { FeaturedProductsSection } from "@/components/home/featured-products";
import { WorkshopSection } from "@/components/home/workshop-section";
import { TestimonialsSection } from "@/components/home/testimonials";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FeaturesBarSection } from "@/components/home/features-bar-section";
import { getAllProductsMerged } from "@/lib/products-merged";
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
  const products = await getAllProductsMerged();

  return (
    <>
      <HeroSection />
      <BestSellersSection products={products} />
      <InfrastructureSection />
      <FirstMoverSection />
      <FeaturedProductsSection products={products} />
      <WorkshopSection />
      <TestimonialsSection />
      <FeaturesBarSection />
      <NewsletterSection />
    </>
  );
}
