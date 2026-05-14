import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { deleteProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminProductsPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-muted-foreground">Configure Supabase to manage products.</p>
    );
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("products")
    .select("id,name,slug,category_slug,featured")
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <p className="text-sm text-destructive">Could not load products: {error.message}</p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Products</h1>
          {sp.error ? (
            <p className="mt-2 text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
          ) : null}
        </div>
        <Button asChild>
          <Link href="/admin/products/new">New product</Link>
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((p) => (
                <tr
                  key={p.id}
                  className={cn(
                    "border-b border-border/80 transition-colors last:border-0",
                    "hover:bg-muted/25",
                  )}
                >
                  <td className="px-4 py-3 text-foreground">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category_slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.featured ? "Yes" : "—"}</td>
                  <td className="px-4 py-3 text-right text-xs">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link href={`/admin/products/${p.id}`}>Edit</Link>
                      </Button>
                      <form action={deleteProduct} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <Button
                          type="submit"
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-destructive hover:text-destructive"
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
        </CardContent>
      </Card>
    </div>
  );
}
