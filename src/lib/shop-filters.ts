import type { Product } from "@/types/product";
import type { ShopSortValue } from "@/config/theme";
import { SHOP_PAGE_SIZE } from "@/config/theme";

export type ShopFilterState = {
  category: string | "all";
  minPrice: number | null;
  maxPrice: number | null;
  finishes: string[];
  sort: ShopSortValue;
  page: number;
  q: string;
};

export function parseProductPrice(price?: string): number | null {
  if (!price) return null;
  const cleaned = price.replace(/[₹$,\s]/g, "");
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return Number.parseFloat(match[1]);
}

export function aggregateCategoryCounts(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}

export function aggregateFinishes(products: Product[]): string[] {
  const set = new Set<string>();
  for (const p of products) {
    for (const f of p.finishes) {
      if (f.trim()) set.add(f.trim());
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getPriceBounds(products: Product[]): { min: number; max: number } {
  const prices = products
    .map((p) => parseProductPrice(p.price))
    .filter((n): n is number => n !== null);
  if (prices.length === 0) return { min: 0, max: 100000 };
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}

export function sortProducts(products: Product[], sort: ShopSortValue): Product[] {
  const copy = [...products];
  if (sort === "latest") return copy;
  if (sort === "price-asc") {
    return copy.sort((a, b) => {
      const pa = parseProductPrice(a.price) ?? Infinity;
      const pb = parseProductPrice(b.price) ?? Infinity;
      return pa - pb;
    });
  }
  return copy.sort((a, b) => {
    const pa = parseProductPrice(a.price) ?? -Infinity;
    const pb = parseProductPrice(b.price) ?? -Infinity;
    return pb - pa;
  });
}

export function filterProducts(
  products: Product[],
  state: Omit<ShopFilterState, "sort" | "page">,
): Product[] {
  const q = state.q.trim().toLowerCase();
  return products.filter((p) => {
    if (state.category !== "all" && p.category !== state.category) return false;

    const price = parseProductPrice(p.price);
    if (state.minPrice !== null && price !== null && price < state.minPrice) return false;
    if (state.maxPrice !== null && price !== null && price > state.maxPrice) return false;

    if (state.finishes.length > 0) {
      const productFinishes = p.finishes.map((f) => f.toLowerCase());
      const match = state.finishes.some((f) =>
        productFinishes.some((pf) => pf.includes(f.toLowerCase())),
      );
      if (!match) return false;
    }

    if (q) {
      const hay = [
        p.name,
        p.shortDescription,
        p.material,
        p.price ?? "",
        ...p.features,
        ...p.applications,
        ...p.finishes,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }

    return true;
  });
}

export function paginateProducts<T>(items: T[], page: number, pageSize = SHOP_PAGE_SIZE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  return {
    items: items.slice(start, end),
    total,
    totalPages,
    page: safePage,
    start: total === 0 ? 0 : start + 1,
    end,
  };
}

export function parseShopSearchParams(
  params: URLSearchParams,
  defaults?: Partial<ShopFilterState>,
): ShopFilterState {
  const category = params.get("category") ?? defaults?.category ?? "all";
  const minRaw = params.get("min");
  const maxRaw = params.get("max");
  const finishRaw = params.get("finish");
  const sort = (params.get("sort") as ShopSortValue) ?? defaults?.sort ?? "latest";
  const pageRaw = params.get("page");
  const q = params.get("q") ?? defaults?.q ?? "";

  return {
    category,
    minPrice: minRaw ? Number.parseFloat(minRaw) : (defaults?.minPrice ?? null),
    maxPrice: maxRaw ? Number.parseFloat(maxRaw) : (defaults?.maxPrice ?? null),
    finishes: finishRaw ? finishRaw.split(",").filter(Boolean) : (defaults?.finishes ?? []),
    sort: sort === "price-asc" || sort === "price-desc" ? sort : "latest",
    page: pageRaw ? Math.max(1, Number.parseInt(pageRaw, 10) || 1) : (defaults?.page ?? 1),
    q,
  };
}

export function buildShopSearchParams(state: ShopFilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.category !== "all") params.set("category", state.category);
  if (state.minPrice !== null) params.set("min", String(state.minPrice));
  if (state.maxPrice !== null) params.set("max", String(state.maxPrice));
  if (state.finishes.length > 0) params.set("finish", state.finishes.join(","));
  if (state.sort !== "latest") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  if (state.q.trim()) params.set("q", state.q.trim());
  return params;
}
