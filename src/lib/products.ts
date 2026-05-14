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

export function getCategorySlugs(): CategorySlug[] {
  return [...CATEGORY_SLUGS];
}

export function isCategorySlug(s: string): s is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(s);
}
