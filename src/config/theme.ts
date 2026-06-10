/** Drinkify theme constants — extracted from fse.catchthemes.com/drinkify */

export const SHOP_PAGE_SIZE = 16;

export const SHOP_SORT_OPTIONS = [
  { value: "latest", label: "Sort by latest" },
  { value: "price-asc", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
] as const;

export type ShopSortValue = (typeof SHOP_SORT_OPTIONS)[number]["value"];

/** Button / accent olive — rgb(132, 118, 48) */
export const DRINKIFY_GOLD = "#847630";

/** Active nav — rgb(255, 124, 49) */
export const DRINKIFY_ORANGE = "#FF7C31";

/** Page background */
export const DRINKIFY_BG = "#FFFFFF";
