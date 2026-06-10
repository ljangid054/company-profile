"use client";

import { cn } from "@/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function ShopPagination({ page, totalPages, onPageChange, className }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={cn("mt-12 flex flex-wrap items-center justify-center gap-2", className)}
      aria-label="Product pagination"
    >
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={cn(
            "flex size-10 items-center justify-center border text-sm transition-colors",
            p === page
              ? "border-[var(--drinkify-gold)] bg-[var(--drinkify-gold)] text-white"
              : "border-border bg-card text-foreground hover:border-[var(--drinkify-gold)] hover:text-[var(--drinkify-gold)]",
          )}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      {page < totalPages ? (
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          className="border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Next Page
        </button>
      ) : null}
    </nav>
  );
}
