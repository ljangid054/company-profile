export const CATEGORY_SLUGS = [
  "heritage-desi",
  "premium-handcrafted",
  "custom-bespoke",
  "lounge-series",
  "compact-artisan",
  "limited-editions",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type Product = {
  id: string;
  category: CategorySlug;
  slug: string;
  name: string;
  shortDescription: string;
  images: string[];
  specifications: { label: string; value: string }[];
  material: string;
  finishes: string[];
  sizes: string[];
  features: string[];
  applications: string[];
  featured?: boolean;
  /** Optional list price or range, e.g. "₹12,500" — from sheet or JSON */
  price?: string;
};

export type CategoryInfo = {
  slug: CategorySlug;
  title: string;
  description: string;
};
