import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategoryMerged } from "@/lib/products-merged";
import {
  getCategoryBySlug,
  getCategorySlugs,
  isCategorySlug,
} from "@/lib/categories";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

type Props = {
  params: Promise<{ category: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!(await isCategorySlug(category))) {
    return { title: "Category" };
  }
  const info = await getCategoryBySlug(category);
  return {
    title: info?.title ?? "Category",
    description: info?.description,
    openGraph: {
      title: `${info?.title ?? "Products"} | Somada Hookah`,
      description: info?.description,
      url: `/products/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!(await isCategorySlug(category))) {
    notFound();
  }

  const info = await getCategoryBySlug(category);
  const items = await getProductsByCategoryMerged(category);

  if (!info) {
    notFound();
  }

  return (
    <Section coverBackground coverScrim="section" className="pt-12 sm:pt-16">
      <Container>
        <FadeIn variant="blur">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Category
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            {info.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {info.description}
          </p>
        </div>
        </FadeIn>

        <FadeIn variant="scale" delay={0.06} className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/products">All categories</Link>
          </Button>
          <Button asChild>
            <Link href="/contact#quote">Request quote</Link>
          </Button>
        </FadeIn>

        <FadeIn variant="up" delay={0.1} className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </FadeIn>

        {items.length === 0 ? (
          <FadeIn variant="scale" className="mt-12">
          <div className="rounded-2xl border border-dashed border-white/15 bg-card/30 p-10 text-center text-sm text-muted-foreground backdrop-blur-sm">
            Listings are being prepared for this category—please reach out for equivalent capabilities.
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/contact#quote">Contact Somada</Link>
              </Button>
            </div>
          </div>
          </FadeIn>
        ) : null}
      </Container>
    </Section>
  );
}
