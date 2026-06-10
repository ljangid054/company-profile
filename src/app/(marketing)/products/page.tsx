import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProductsMerged } from "@/lib/products-merged";
import { getAllCategories } from "@/lib/categories";
import { Container } from "@/components/ui/container";
import { ShopLayout } from "@/components/shop/shop-layout";
import { ProductsCatalogFromApi } from "@/components/products/products-catalog-from-api";

export const metadata: Metadata = {
  title: "The Shop — Somada Hookah catalog",
  description:
    "Browse Somada Hookah handcrafted brass hookahs — heritage desi silhouettes, bespoke collections, lounge series, and limited editions.",
  openGraph: {
    title: "The Shop | Somada Hookah",
    description: "Premium handcrafted desi brass hookahs from Somda, Rajasthan.",
    url: "/products",
  },
};

export const revalidate = 60;

function ShopSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-12 w-48 bg-muted" />
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden h-96 bg-muted lg:block" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const clientFetch = process.env.NEXT_PUBLIC_FETCH_PRODUCTS_FROM_API === "1";

  if (clientFetch) {
    return (
      <section className="py-10 lg:py-14">
        <Container className="max-w-7xl">
          <ProductsCatalogFromApi />
        </Container>
      </section>
    );
  }

  const [products, categories] = await Promise.all([
    getAllProductsMerged(),
    getAllCategories(),
  ]);

  return (
    <section className="py-10 lg:py-14">
      <Container className="max-w-7xl">
        <Suspense fallback={<ShopSkeleton />}>
          <ShopLayout
            products={products}
            categories={categories}
            description="Handcrafted brass hookahs from Somda, Rajasthan — filter by category, finish, and price. Every piece quoted bench-to-bench for wholesale programs."
          />
        </Suspense>
      </Container>
    </section>
  );
}
