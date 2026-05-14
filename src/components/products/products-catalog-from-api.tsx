"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { ProductsCatalog } from "@/components/products/products-catalog";

export function ProductsCatalogFromApi() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data: unknown = await res.json();
        if (
          !data ||
          typeof data !== "object" ||
          !Array.isArray((data as { products?: unknown }).products)
        ) {
          throw new Error("Invalid response");
        }
        if (!cancelled) {
          setProducts((data as { products: Product[] }).products);
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

  if (!products) {
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

  return <ProductsCatalog products={products} />;
}
