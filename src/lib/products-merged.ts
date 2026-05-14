import { unstable_cache } from "next/cache";
import productsData from "@/data/products.json";
import {
  fetchProductsFromGoogleSheet,
  isGoogleSheetConfigured,
} from "@/lib/google-sheet-products";
import type { CategorySlug, Product } from "@/types/product";

const staticProducts = productsData as Product[];

/**
 * When Google Sheet env is set: catalog is **sheet only** (no `products.json` on the site).
 * When not set: catalog falls back to static `products.json`.
 */
async function computeCatalogProducts(): Promise<Product[]> {
  if (isGoogleSheetConfigured()) {
    return fetchProductsFromGoogleSheet();
  }
  return staticProducts;
}

const getCatalogCached = unstable_cache(
  computeCatalogProducts,
  ["catalog-products-sheet-or-static-v2"],
  { revalidate: 60 },
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
