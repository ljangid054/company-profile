import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  AdminProductForm,
  type AdminProductInitial,
} from "@/components/admin/admin-product-form";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

function parseSpecs(raw: unknown): { label: string; value: string }[] {
  if (!Array.isArray(raw)) return [];
  const out: { label: string; value: string }[] = [];
  for (const item of raw) {
    if (
      item &&
      typeof item === "object" &&
      "label" in item &&
      "value" in item &&
      typeof (item as { label: unknown }).label === "string" &&
      typeof (item as { value: unknown }).value === "string"
    ) {
      out.push({
        label: (item as { label: string }).label,
        value: (item as { value: string }).value,
      });
    }
  }
  return out;
}

export default async function AdminProductEditPage({ params, searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-muted-foreground">Configure Supabase first.</p>;
  }
  const { id } = await params;
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();

  const [{ data: product, error: pErr }, { data: cats, error: cErr }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("slug,title").order("sort_order", { ascending: true }),
  ]);

  if (pErr || cErr) {
    return (
      <p className="text-sm text-destructive">
        {pErr?.message ?? cErr?.message ?? "Error"}
      </p>
    );
  }
  if (!product) {
    notFound();
  }

  const initial: AdminProductInitial = {
    id: product.id,
    category_slug: product.category_slug,
    slug: product.slug,
    name: product.name,
    short_description: product.short_description ?? "",
    material: product.material ?? "",
    price: product.price ?? "",
    featured: Boolean(product.featured),
    images: (product.images as string[] | null) ?? [],
    specifications: parseSpecs(product.specifications),
    finishes: (product.finishes as string[] | null) ?? [],
    sizes: (product.sizes as string[] | null) ?? [],
    features: (product.features as string[] | null) ?? [],
    applications: (product.applications as string[] | null) ?? [],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl text-foreground">Edit product</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">Back to list</Link>
        </Button>
      </div>
      {sp.error ? (
        <p className="text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
      ) : null}
      <AdminProductForm categories={cats ?? []} initial={initial} />
    </div>
  );
}
