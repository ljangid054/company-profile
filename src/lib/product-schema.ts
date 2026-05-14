import { z } from "zod";
import { CATEGORY_SLUGS, type CategorySlug } from "@/types/product";
import type { Product } from "@/types/product";

const categoryZ = z
  .string()
  .refine((s): s is CategorySlug =>
    (CATEGORY_SLUGS as readonly string[]).includes(s),
  );

const specRowZ = z.object({
  label: z.string(),
  value: z.string(),
});

export const productSchema: z.ZodType<Product> = z.object({
  id: z.string().min(1),
  category: categoryZ,
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string(),
  images: z.array(z.string()),
  specifications: z.array(specRowZ),
  material: z.string(),
  finishes: z.array(z.string()),
  sizes: z.array(z.string()),
  features: z.array(z.string()),
  applications: z.array(z.string()),
  featured: z.boolean().optional(),
  price: z.string().optional(),
});
