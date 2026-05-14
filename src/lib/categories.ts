import { categories as staticCategories } from "@/data/categories";
import { getSupabaseCategories } from "@/lib/supabase/catalog";
import { isSupabaseCatalogEnabled } from "@/lib/supabase/env";
import type { CategoryInfo, CategorySlug } from "@/types/product";

export async function getAllCategories(): Promise<CategoryInfo[]> {
  if (isSupabaseCatalogEnabled()) {
    return getSupabaseCategories();
  }
  return staticCategories;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryInfo | undefined> {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug);
}

export async function getCategorySlugs(): Promise<string[]> {
  const all = await getAllCategories();
  return all.map((c) => c.slug);
}

export async function isCategorySlug(s: string): Promise<boolean> {
  const slugs = await getCategorySlugs();
  return slugs.includes(s);
}

export async function titleFromSlug(slug: CategorySlug): Promise<string> {
  const c = await getCategoryBySlug(slug);
  return c?.title ?? slug;
}
