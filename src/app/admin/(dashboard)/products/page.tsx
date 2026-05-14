import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { deleteProduct } from "@/app/admin/actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminProductsPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-zinc-500">Configure Supabase to manage products.</p>;
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("products")
    .select("id,name,slug,category_slug,featured")
    .order("updated_at", { ascending: false });

  if (error) {
    return <p className="text-sm text-red-400">Could not load products: {error.message}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-white">Products</h1>
          {sp.error ? (
            <p className="mt-2 text-sm text-red-400">{decodeURIComponent(sp.error)}</p>
          ) : null}
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-black hover:bg-amber-500"
        >
          New product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500">
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
              <tr key={p.id} className="border-b border-zinc-800/80 last:border-0">
                <td className="px-4 py-3 text-zinc-200">{p.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">{p.slug}</td>
                <td className="px-4 py-3 text-zinc-400">{p.category_slug}</td>
                <td className="px-4 py-3 text-zinc-400">{p.featured ? "Yes" : ""}</td>
                <td className="space-x-3 px-4 py-3 text-right text-xs">
                  <Link className="text-amber-400 hover:underline" href={`/admin/products/${p.id}`}>
                    Edit
                  </Link>
                  <form action={deleteProduct} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
