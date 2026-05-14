import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { AdminProductForm } from "@/components/admin/admin-product-form";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminProductNewPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-zinc-500">Configure Supabase first.</p>;
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: cats, error } = await supabase
    .from("categories")
    .select("slug,title")
    .order("sort_order", { ascending: true });

  if (error) {
    return <p className="text-sm text-red-400">{error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl text-white">New product</h1>
        <Link href="/admin/products" className="text-sm text-amber-400 hover:underline">
          Back to list
        </Link>
      </div>
      {sp.error ? (
        <p className="text-sm text-red-400">{decodeURIComponent(sp.error)}</p>
      ) : null}
      <AdminProductForm categories={cats ?? []} />
    </div>
  );
}
