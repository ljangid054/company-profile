import { unstable_cache } from "next/cache";
import productsData from "@/data/products.json";
import { getSupabaseProducts } from "@/lib/supabase/catalog";
import { isSupabaseCatalogEnabled } from "@/lib/supabase/env";
import type { CategorySlug, Product } from "@/types/product";

const staticProducts = productsData as Product[];

/**
 * When `NEXT_PUBLIC_CATALOG_SOURCE=supabase`: Postgres catalog.
 * Otherwise: static `products.json`.
 */
async function computeCatalogProducts(): Promise<Product[]> {
  if (isSupabaseCatalogEnabled()) {
    return getSupabaseProducts();
  }
  return staticProducts;
}

const getCatalogCached = unstable_cache(
  computeCatalogProducts,
  ["catalog-products-v3"],
  { revalidate: 60, tags: ["catalog-products"] },
);

export async function getAllProductsMerged(): Promise<Product[]> {
  return getCatalogCached();
}

export async function getFeaturedProductsMerged(): Promise<Product[]> {
  const all = await getAllProductsMerged();
  return all.filter((p) => p.featured);
}

export async function getProductsByCategoryMerged(
  category: CategorySlug,
): Promise<Product[]> {
  const all = await getAllProductsMerged();
  return all.filter((p) => p.category === category);
}

export async function getProductMerged(
  category: CategorySlug,
  slug: string,
): Promise<Product | undefined> {
  const all = await getAllProductsMerged();
  return all.find((p) => p.category === category && p.slug === slug);
}

export async function searchProductsMerged(query: string): Promise<Product[]> {
  const all = await getAllProductsMerged();
  const q = query.trim().toLowerCase();
  if (!q) return all;
  return all.filter((p) => {
    const hay = [
      p.name,
      p.shortDescription,
      p.material,
      p.price ?? "",
      ...p.features,
      ...p.applications,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
