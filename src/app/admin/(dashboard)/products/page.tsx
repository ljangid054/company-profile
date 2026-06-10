import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { deleteProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminProductsPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-muted-foreground">Configure Supabase to manage products.</p>;
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("products")
    .select("id,name,slug,category_slug,featured")
    .order("updated_at", { ascending: false });

  if (error) {
    return <p className="text-sm text-destructive">Could not load products: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {sp.error ? (
          <p className="text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
        ) : (
          <p className="text-sm text-muted-foreground">{rows?.length ?? 0} products in catalog</p>
        )}
        <Button asChild>
          <Link href="/admin/products/new">+ New product</Link>
        </Button>
      </div>

      <div className="admin-table-wrap overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Featured</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((p) => (
              <tr key={p.id}>
                <td className="font-medium text-foreground">{p.name}</td>
                <td className="font-mono text-xs text-muted-foreground">{p.slug}</td>
                <td className="text-muted-foreground">{p.category_slug}</td>
                <td>
                  {p.featured ? (
                    <span className="admin-badge bg-[#f0ede0] px-2 py-0.5 text-xs font-medium text-[#5c5328]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="link" size="sm" className="h-auto p-0" asChild>
                      <Link href={`/admin/products/${p.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteProduct} className="inline">
                      <input type="hidden" name="id" value={p.id} />
                      <Button
                        type="submit"
                        variant="link"
                        size="sm"
                        className={cn("h-auto p-0 text-destructive")}
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
