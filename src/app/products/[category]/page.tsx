import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory, getCategorySlugs, isCategorySlug } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import type { CategorySlug } from "@/types/product";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) {
    return { title: "Category" };
  }
  const info = getCategoryBySlug(category);
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
  if (!isCategorySlug(category)) {
    notFound();
  }

  const info = getCategoryBySlug(category);
  const items = getProductsByCategory(category as CategorySlug);

  if (!info) {
    notFound();
  }

  return (
    <Section coverBackground coverScrim="section" className="pt-12 sm:pt-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Category
          </p>
          <h1 className="mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            {info.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {info.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/products">All categories</Link>
          </Button>
          <Button asChild>
            <Link href="/contact#quote">Request quote</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border/70 bg-card/30 p-10 text-center text-sm text-muted-foreground">
            Listings are being prepared for this category—please reach out for equivalent capabilities.
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/contact#quote">Contact Somada</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
