import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProductsMerged } from "@/lib/products-merged";
import { getCategorySlugs } from "@/lib/products";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const ts = new Date();

  const products = await getAllProductsMerged();

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: ts, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/about`,
      lastModified: ts,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/products`,
      lastModified: ts,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/contact`,
      lastModified: ts,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  for (const category of getCategorySlugs()) {
    routes.push({
      url: `${base}/products/${category}`,
      lastModified: ts,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const product of products) {
    routes.push({
      url: `${base}/products/${product.category}/${product.slug}`,
      lastModified: ts,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return routes;
}
