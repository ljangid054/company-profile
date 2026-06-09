import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { deleteCategory, upsertCategory } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminCategoriesPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-muted-foreground">Configure Supabase to manage categories.</p>
    );
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("categories")
    .select("slug,title,description,sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Could not load categories: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {sp.error ? (
        <p className="text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
      ) : null}

      <div className="admin-table-wrap overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Sort</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((c) => (
                <tr key={c.slug}>
                  <td className="font-mono text-xs text-foreground">{c.slug}</td>
                  <td className="text-foreground">{c.title}</td>
                  <td className="text-muted-foreground">{c.sort_order}</td>
                  <td className="text-right">
                    <form action={deleteCategory} className="inline">
                      <input type="hidden" name="slug" value={c.slug} />
                      <Button
                        type="submit"
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-destructive hover:text-destructive"
                        title="Deletes only if no products reference this slug"
                      >
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add or update</CardTitle>
          <CardDescription>
            Slug is the URL segment under{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              /products/[slug]
            </code>
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={upsertCategory} className="grid max-w-xl gap-5">
            <div className="grid gap-2">
              <Label htmlFor="cat-slug">Slug</Label>
              <Input id="cat-slug" name="slug" required placeholder="heritage-desi" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cat-title">Title</Label>
              <Input id="cat-title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cat-description">Description</Label>
              <Textarea id="cat-description" name="description" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cat-sort">Sort order</Label>
              <Input id="cat-sort" name="sort_order" type="number" defaultValue={0} />
            </div>
            <Button type="submit" className="w-fit">
              Save category
            </Button>
          </form>
          <p className="mt-6 text-xs text-muted-foreground">
            <Button variant="link" size="sm" className="h-auto p-0" asChild>
              <Link href="/admin/products">Products</Link>
            </Button>{" "}
            must use an existing category slug in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              category_slug
            </code>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
