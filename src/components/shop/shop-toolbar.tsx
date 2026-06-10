"use client";

import { SHOP_SORT_OPTIONS, type ShopSortValue } from "@/config/theme";
import { cn } from "@/lib/utils";

type Props = {
  start: number;
  end: number;
  total: number;
  sort: ShopSortValue;
  onSortChange: (sort: ShopSortValue) => void;
  onOpenFilters?: () => void;
  className?: string;
};

export function ShopToolbar({
  start,
  end,
  total,
  sort,
  onSortChange,
  onOpenFilters,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {onOpenFilters ? (
          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium lg:hidden"
          >
            Filters
          </button>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {total === 0 ? (
            "No results"
          ) : (
            <>
              Showing{" "}
              <span className="font-medium text-foreground">
                {start}–{end}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{total}</span> results
            </>
          )}
        </p>
      </div>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as ShopSortValue)}
        className="h-10 border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        aria-label="Sort products"
      >
        {SHOP_SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
