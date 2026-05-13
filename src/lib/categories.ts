import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types/product";

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories() {
  return categories;
}

export function titleFromSlug(slug: CategorySlug): string {
  const c = getCategoryBySlug(slug);
  return c?.title ?? slug;
}
