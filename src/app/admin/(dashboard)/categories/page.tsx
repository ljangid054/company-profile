import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { deleteCategory, upsertCategory } from "@/app/admin/actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminCategoriesPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-zinc-500">Configure Supabase to manage categories.</p>;
  }
  const sp = await searchParams;
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("categories")
    .select("slug,title,description,sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-sm text-red-400">
        Could not load categories: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-3xl text-white">Categories</h1>
        {sp.error ? (
          <p className="mt-2 text-sm text-red-400">{decodeURIComponent(sp.error)}</p>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Sort</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((c) => (
              <tr key={c.slug} className="border-b border-zinc-800/80 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-zinc-300">{c.slug}</td>
                <td className="px-4 py-3 text-zinc-200">{c.title}</td>
                <td className="px-4 py-3 text-zinc-400">{c.sort_order}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteCategory} className="inline">
                    <input type="hidden" name="slug" value={c.slug} />
                    <button
                      type="submit"
                      className="text-xs text-red-400 hover:underline"
                      title="Deletes only if no products reference this slug"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="font-heading text-xl text-white">Add or update</h2>
        <p className="mt-2 text-xs text-zinc-500">
          Slug is the URL segment under <span className="text-zinc-300">/products/[slug]</span>.
        </p>
        <form action={upsertCategory} className="mt-6 grid max-w-xl gap-4">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Slug</span>
            <input
              name="slug"
              required
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
              placeholder="heritage-desi"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Title</span>
            <input
              name="title"
              required
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Description</span>
            <textarea
              name="description"
              rows={3}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Sort order</span>
            <input
              name="sort_order"
              type="number"
              defaultValue={0}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <button
            type="submit"
            className="w-fit rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-black hover:bg-amber-500"
          >
            Save category
          </button>
        </form>
        <p className="mt-6 text-xs text-zinc-500">
          <Link href="/admin/products" className="text-amber-400 hover:underline">
            Products
          </Link>{" "}
          must use an existing category slug in{" "}
          <code className="text-zinc-300">category_slug</code>.
        </p>
      </section>
    </div>
  );
}
