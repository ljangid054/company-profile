import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { Button } from "@/components/ui/button";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminProductNewPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-muted-foreground">Configure Supabase first.</p>;
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: cats, error } = await supabase
    .from("categories")
    .select("slug,title")
    .order("sort_order", { ascending: true });

  if (error) {
    return <p className="text-sm text-destructive">{error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/products">← Back to list</Link>
        </Button>
      </div>
      {sp.error ? (
        <p className="text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
      ) : null}
      <AdminProductForm categories={cats ?? []} />
    </div>
  );
}
