import { unstable_cache } from "next/cache";
import type { CategoryInfo, Product } from "@/types/product";
import { createPublicSupabaseClient } from "@/lib/supabase/public";

type DbCategory = {
  slug: string;
  title: string;
  description: string;
  sort_order: number;
};

type DbProduct = {
  id: string;
  category_slug: string;
  slug: string;
  name: string;
  short_description: string;
  images: string[] | null;
  specifications: unknown;
  material: string;
  finishes: string[] | null;
  sizes: string[] | null;
  features: string[] | null;
  applications: string[] | null;
  featured: boolean | null;
  price: string | null;
};

function parseSpecs(raw: unknown): { label: string; value: string }[] {
  if (!Array.isArray(raw)) return [];
  const out: { label: string; value: string }[] = [];
  for (const item of raw) {
    if (
      item &&
      typeof item === "object" &&
      "label" in item &&
      "value" in item &&
      typeof (item as { label: unknown }).label === "string" &&
      typeof (item as { value: unknown }).value === "string"
    ) {
      out.push({
        label: (item as { label: string }).label,
        value: (item as { value: string }).value,
      });
    }
  }
  return out;
}

export function mapDbProduct(row: DbProduct): Product {
  return {
    id: row.id,
    category: row.category_slug,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description ?? "",
    images: row.images ?? [],
    specifications: parseSpecs(row.specifications),
    material: row.material ?? "",
    finishes: row.finishes ?? [],
    sizes: row.sizes ?? [],
    features: row.features ?? [],
    applications: row.applications ?? [],
    featured: row.featured ?? undefined,
    price: row.price ?? undefined,
  };
}

async function fetchCategoriesUncached(): Promise<CategoryInfo[]> {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("slug,title,description,sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as DbCategory[]).map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.description ?? "",
  }));
}

async function fetchProductsUncached(): Promise<Product[]> {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return ((data ?? []) as DbProduct[]).map(mapDbProduct);
}

const getCategoriesCached = unstable_cache(
  fetchCategoriesUncached,
  ["supabase-categories-v1"],
  { revalidate: 60, tags: ["supabase-categories"] },
);

const getProductsCached = unstable_cache(
  fetchProductsUncached,
  ["supabase-products-v1"],
  { revalidate: 60, tags: ["supabase-products"] },
);

export async function getSupabaseCategories(): Promise<CategoryInfo[]> {
  return getCategoriesCached();
}

export async function getSupabaseProducts(): Promise<Product[]> {
  return getProductsCached();
}
