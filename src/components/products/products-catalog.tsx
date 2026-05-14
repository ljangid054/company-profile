"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { CategoryInfo, Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  categories: CategoryInfo[];
};

export function ProductsCatalog({ products, categories }: Props) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = category === "all" || p.category === category;
      if (!catOk) return false;
      if (!q) return true;
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
  }, [products, deferredQuery, category]);

  const cats = categories;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl space-y-2">
          <label htmlFor="product-search" className="text-sm font-medium text-foreground">
            Search catalog
          </label>
          <Input
            id="product-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, finish, application…"
            autoComplete="off"
          />
          <p className="text-xs text-muted-foreground">
            Filtering runs entirely in your browser—no tracking, no database calls.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Categories
        </p>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex w-max gap-2 pb-1">
            <Button
              type="button"
              size="sm"
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setCategory("all")}
            >
              All categories
            </Button>
            {cats.map((c) => (
              <Button
                key={c.slug}
                type="button"
                size="sm"
                variant={category === c.slug ? "default" : "outline"}
                className={cn("rounded-full")}
                onClick={() => setCategory(c.slug)}
              >
                {c.title}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 p-12 text-center">
          <p className="font-heading text-xl text-foreground">No matches</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Try a shorter keyword or switch category filters.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Reset filters
            </button>
            <Link href="/contact#quote" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Request custom quote
            </Link>
          </div>
        </div>
      ) : (
        <motion.div layout className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
