import productsData from "@/data/products.json";
import type { CategorySlug, Product } from "@/types/product";
import { CATEGORY_SLUGS } from "@/types/product";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProduct(
  category: CategorySlug,
  slug: string,
): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => {
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

/** Slugs from bundled JSON only (legacy helpers). Prefer `getCategorySlugs` in `@/lib/categories`. */
export function getCategorySlugsFromStaticJson(): CategorySlug[] {
  return [...CATEGORY_SLUGS];
}
