"use client";

import type { CategoryInfo, Product } from "@/types/product";
import { ShopLayout } from "@/components/shop/shop-layout";

type Props = {
  products: Product[];
  categories: CategoryInfo[];
  /** When true, listings were loaded from Postgres (Supabase) on the server. */
  dataFromSupabase?: boolean;
  defaultCategory?: string;
  title?: string;
  description?: string;
};

export function ProductsCatalog({
  products,
  categories,
  defaultCategory,
  title,
  description,
}: Props) {
  return (
    <ShopLayout
      products={products}
      categories={categories}
      defaultCategory={defaultCategory}
      title={title}
      description={description}
    />
  );
}
