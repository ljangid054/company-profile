import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProductsMerged } from "@/lib/products-merged";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategorySlugs,
  isCategorySlug,
} from "@/lib/categories";
import { Container } from "@/components/ui/container";
import { ShopLayout } from "@/components/shop/shop-layout";

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

function ShopSkeleton() {
  return <div className="h-96 animate-pulse bg-muted" />;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!(await isCategorySlug(category))) {
    notFound();
  }

  const info = await getCategoryBySlug(category);
  if (!info) {
    notFound();
  }

  const [allProducts, cats] = await Promise.all([
    getAllProductsMerged(),
    getAllCategories(),
  ]);

  return (
    <section className="py-10 lg:py-14">
      <Container className="max-w-7xl">
        <Suspense fallback={<ShopSkeleton />}>
          <ShopLayout
            products={allProducts}
            categories={cats}
            defaultCategory={category}
            title={info.title}
            description={info.description}
          />
        </Suspense>
      </Container>
    </section>
  );
}
