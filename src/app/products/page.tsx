import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ProductsCatalog } from "@/components/products/products-catalog";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { LINEUP_IMAGE_PRIMARY, LINEUP_IMAGE_SECONDARY } from "@/config/visual";

export const metadata: Metadata = {
  title: "Handcrafted desi brass hookahs — Somada catalog",
  description:
    "Browse Somada Hookah: heritage desi hookahs, premium handcrafted collections, bespoke weddings, lounge series, compact artisan hookahs, and limited editions—all handmade in Somda, Rajasthan.",
  openGraph: {
    title: "Somada Hookah product catalog",
    description:
      "Premium handcrafted desi brass hookahs from Somda, Rajasthan — heritage, bespoke, lounge, and limited editions.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const products = getAllProducts();
  const cats = getAllCategories();

  return (
    <Section coverBackground coverScrim="section" className="pt-12 sm:pt-16">
      <Container>
        <FadeIn variant="blur">
          <Heading
            eyebrow="Catalog"
            as="h1"
            title="Handcrafted brass—built for hospitality reality"
            description="Explore six handcrafted hookah lines—from heritage desi silhouettes and bespoke wedding pairs to lounge rotations and numbered collector drops. Every hookah is quoted bench-to-bench."
          />
        </FadeIn>

        <FadeIn variant="scale" delay={0.06} className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border/70 bg-muted/25">
            <Image
              src={LINEUP_IMAGE_PRIMARY}
              alt="Somada handcrafted brass hookah lineup"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border/70 bg-muted/25">
            <Image
              src={LINEUP_IMAGE_SECONDARY}
              alt="Somada brass hookahs — workshop lineup"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </FadeIn>

        <FadeIn variant="up" delay={0.1} className="mt-10">
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-card/50 p-6 shadow-lg shadow-black/20 backdrop-blur-md md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Categories
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link className="hover:text-foreground" href={`/products/${c.slug}`}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Wholesale buyers start with a mood board or lounge brief—we translate finishes, heights, and engraving depth into a handcrafted production plan. Weddings, exports, and collector drops welcome.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact#quote">Request bulk quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">Why Somada</Link>
              </Button>
            </div>
          </div>
        </div>
        </FadeIn>

        <FadeIn variant="blur" delay={0.08} className="mt-14">
          <ProductsCatalog products={products} />
        </FadeIn>

        <FadeIn variant="scale" className="mt-16">
        <div className="rounded-2xl border border-dashed border-white/15 bg-muted/15 p-8 text-sm text-muted-foreground backdrop-blur-sm">
          <p>
            All listings are representative of Somada workshop capabilities. Specifications may vary slightly between artisan batches—final certificates provided at quotation stage for wholesale programs.
          </p>
          <p className="mt-3">
            Official correspondence:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
