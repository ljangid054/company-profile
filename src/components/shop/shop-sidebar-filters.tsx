"use client";

import Link from "next/link";
import type { CategoryInfo } from "@/types/product";
import { cn } from "@/lib/utils";

type Props = {
  categories: CategoryInfo[];
  categoryCounts: Record<string, number>;
  selectedCategory: string | "all";
  minPrice: number;
  maxPrice: number;
  priceMin: number | null;
  priceMax: number | null;
  finishes: string[];
  selectedFinishes: string[];
  onCategoryChange: (category: string | "all") => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  onFinishToggle: (finish: string) => void;
  onReset: () => void;
  className?: string;
};

export function ShopSidebarFilters({
  categories,
  categoryCounts,
  selectedCategory,
  minPrice,
  maxPrice,
  priceMin,
  priceMax,
  finishes,
  selectedFinishes,
  onCategoryChange,
  onPriceChange,
  onFinishToggle,
  onReset,
  className,
}: Props) {
  const effectiveMin = priceMin ?? minPrice;
  const effectiveMax = priceMax ?? maxPrice;
  const totalCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <aside className={cn("shop-sidebar space-y-8", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div>
        <h3 className="font-heading text-base font-semibold">Product Categories</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={cn(
                "flex w-full items-center justify-between text-sm transition-colors",
                selectedCategory === "all"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>All products</span>
              <span className="text-xs">{totalCount}</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  "flex w-full items-center justify-between text-sm transition-colors",
                  selectedCategory === cat.slug
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{cat.title}</span>
                <span className="text-xs">{categoryCounts[cat.slug] ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-heading text-base font-semibold">Filter by price</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>₹{effectiveMin.toLocaleString("en-IN")}</span>
            <span>₹{effectiveMax.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={effectiveMax}
            onChange={(e) =>
              onPriceChange(priceMin, Number.parseInt(e.target.value, 10))
            }
            className="h-1.5 w-full cursor-pointer accent-primary"
            aria-label="Maximum price"
          />
        </div>
      </div>

      {finishes.length > 0 ? (
        <div>
          <h3 className="font-heading text-base font-semibold">Filter by finish</h3>
          <ul className="mt-4 space-y-2">
            {finishes.map((finish) => {
              const checked = selectedFinishes.includes(finish);
              return (
                <li key={finish}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFinishToggle(finish)}
                      className="size-4 accent-primary"
                    />
                    <span className={checked ? "text-foreground" : undefined}>{finish}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="border-t border-border pt-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Wholesale programs quoted bench-to-bench.{" "}
          <Link href="/contact#quote" className="text-primary underline-offset-4 hover:underline">
            Request bulk quote
          </Link>
        </p>
      </div>
    </aside>
  );
}
