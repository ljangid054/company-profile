"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CategoryInfo, Product } from "@/types/product";
import type { ShopSortValue } from "@/config/theme";
import {
  aggregateCategoryCounts,
  aggregateFinishes,
  buildShopSearchParams,
  filterProducts,
  getPriceBounds,
  paginateProducts,
  parseShopSearchParams,
  sortProducts,
  type ShopFilterState,
} from "@/lib/shop-filters";
import { ShopSidebarFilters } from "@/components/shop/shop-sidebar-filters";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { ShopPagination } from "@/components/shop/shop-pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

type Props = {
  products: Product[];
  categories: CategoryInfo[];
  defaultCategory?: string;
  title?: string;
  description?: string;
};

export function ShopLayout({
  products,
  categories,
  defaultCategory,
  title = "The Shop",
  description,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceBounds = useMemo(() => getPriceBounds(products), [products]);
  const categoryCounts = useMemo(() => aggregateCategoryCounts(products), [products]);
  const allFinishes = useMemo(() => aggregateFinishes(products), [products]);

  const state = useMemo(
    () =>
      parseShopSearchParams(searchParams, {
        category: defaultCategory ?? "all",
      }),
    [searchParams, defaultCategory],
  );

  const pushState = useCallback(
    (next: Partial<ShopFilterState>) => {
      const merged: ShopFilterState = { ...state, ...next };
      if (
        next.category !== undefined ||
        next.minPrice !== undefined ||
        next.maxPrice !== undefined ||
        next.finishes !== undefined ||
        next.q !== undefined
      ) {
        merged.page = 1;
      }
      const params = buildShopSearchParams(merged);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [state, router, pathname],
  );

  const filtered = useMemo(() => {
    const base = filterProducts(products, state);
    return sortProducts(base, state.sort);
  }, [products, state]);

  const pagination = useMemo(
    () => paginateProducts(filtered, state.page),
    [filtered, state.page],
  );

  const sidebarProps = {
    categories,
    categoryCounts,
    selectedCategory: state.category,
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    priceMin: state.minPrice,
    priceMax: state.maxPrice,
    finishes: allFinishes,
    selectedFinishes: state.finishes,
    onCategoryChange: (category: string | "all") => pushState({ category }),
    onPriceChange: (min: number | null, max: number | null) =>
      pushState({ minPrice: min, maxPrice: max }),
    onFinishToggle: (finish: string) => {
      const next = state.finishes.includes(finish)
        ? state.finishes.filter((f) => f !== finish)
        : [...state.finishes, finish];
      pushState({ finishes: next });
    },
    onReset: () =>
      router.push(defaultCategory ? `${pathname}?category=${defaultCategory}` : pathname),
  };

  return (
    <div>
      <header className="mb-10 text-center">
        <h1 className="font-heading text-4xl font-normal text-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground lg:max-w-none">
            {description}
          </p>
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <ShopSidebarFilters {...sidebarProps} className="hidden lg:block" />

        <div>
          <ShopToolbar
            start={pagination.start}
            end={pagination.end}
            total={pagination.total}
            sort={state.sort}
            onSortChange={(sort: ShopSortValue) => pushState({ sort })}
            onOpenFilters={() => setFiltersOpen(true)}
          />

          {pagination.items.length === 0 ? (
            <div className="mt-10 border border-dashed border-border bg-muted/30 p-12 text-center">
              <p className="font-heading text-xl text-foreground">No matches</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Try adjusting filters or search terms.
              </p>
              <button
                type="button"
                onClick={sidebarProps.onReset}
                className="mt-6 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {pagination.items.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <ShopPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => pushState({ page })}
          />

          <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            Wholesale buyers welcome —{" "}
            <Link href="/contact#quote" className="text-primary underline-offset-4 hover:underline">
              request a bulk quote
            </Link>
          </div>
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <ShopSidebarFilters {...sidebarProps} className="mt-4 border-0 p-0 shadow-none" />
        </SheetContent>
      </Sheet>
    </div>
  );
}
