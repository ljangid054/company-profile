"use client";

import { useEffect, useState } from "react";
import type { CategoryInfo, Product } from "@/types/product";
import { ProductsCatalog } from "@/components/products/products-catalog";

export function ProductsCatalogFromApi() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<CategoryInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [pres, cres] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/categories", { cache: "no-store" }),
        ]);
        if (!pres.ok) {
          throw new Error(`Products HTTP ${pres.status}`);
        }
        if (!cres.ok) {
          throw new Error(`Categories HTTP ${cres.status}`);
        }
        const pdata: unknown = await pres.json();
        const cdata: unknown = await cres.json();
        if (
          !pdata ||
          typeof pdata !== "object" ||
          !Array.isArray((pdata as { products?: unknown }).products)
        ) {
          throw new Error("Invalid products response");
        }
        if (
          !cdata ||
          typeof cdata !== "object" ||
          !Array.isArray((cdata as { categories?: unknown }).categories)
        ) {
          throw new Error("Invalid categories response");
        }
        if (!cancelled) {
          setProducts((pdata as { products: Product[] }).products);
          setCategories((cdata as { categories: CategoryInfo[] }).categories);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load catalog");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-8 text-center text-sm text-destructive">
        Could not load products ({error}). Check API configuration or try again.
      </div>
    );
  }

  if (!products || !categories) {
    return (
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[420px] animate-pulse rounded-2xl border border-border/50 bg-muted/30"
            aria-hidden
          />
        ))}
      </div>
    );
  }

  return <ProductsCatalog products={products} categories={categories} />;
}
