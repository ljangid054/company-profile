import Link from "next/link";
import { Package, FolderTree, Mail, Star, Plus, ArrowUpRight } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseCatalogEnabled, isSupabaseConfigured } from "@/lib/supabase/env";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Button } from "@/components/ui/button";

export default async function AdminHomePage() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerSupabaseClient();
  const [products, categories, contacts, featured] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("slug", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("featured", true),
  ]);

  const storefrontFromDb = isSupabaseCatalogEnabled();

  const { data: recentContacts } = await supabase
    .from("contact_submissions")
    .select("id,name,email,created_at,product_sku")
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: recentProducts } = await supabase
    .from("products")
    .select("id,name,slug,category_slug,featured")
    .order("updated_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      <div className="admin-panel flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="admin-heading text-lg font-semibold text-foreground">Welcome back</p>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Manage your Somada catalog, review export inquiries, and keep the storefront up to date.
          </p>
          <div className="mt-3">
            <span
              className={
                storefrontFromDb ? "admin-badge admin-badge-success" : "admin-badge admin-badge-muted"
              }
            >
              {storefrontFromDb ? "Live · Supabase catalog" : "Static JSON catalog"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/admin/products/new">
              <Plus className="size-4" />
              New product
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/" target="_blank">
              View store
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Products" value={products.count ?? 0} hint="Active SKUs" icon={Package} />
        <AdminStatCard label="Categories" value={categories.count ?? 0} hint="Product lines" icon={FolderTree} />
        <AdminStatCard label="Inquiries" value={contacts.count ?? 0} hint="Contact submissions" icon={Mail} />
        <AdminStatCard label="Featured" value={featured.count ?? 0} hint="On homepage stack" icon={Star} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="admin-table-wrap">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="admin-heading text-sm font-semibold">Recent inquiries</h2>
            <Link href="/admin/contacts" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <table className="w-full min-w-[400px]">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {(recentContacts ?? []).length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-muted-foreground">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                (recentContacts ?? []).map((r) => (
                  <tr key={r.id}>
                    <td className="font-medium text-foreground">{r.name}</td>
                    <td className="text-muted-foreground">{r.email}</td>
                    <td className="text-xs text-muted-foreground">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-table-wrap">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="admin-heading text-sm font-semibold">Recently updated products</h2>
            <Link href="/admin/products" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <table className="w-full min-w-[400px]">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(recentProducts ?? []).map((p) => (
                <tr key={p.id}>
                  <td className="font-medium text-foreground">{p.name}</td>
                  <td className="text-xs text-muted-foreground">{p.category_slug}</td>
                  <td className="text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
