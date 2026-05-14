import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function AdminHomePage() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-white">Dashboard</h1>
      <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
        Manage catalog content in Supabase. When you are ready to serve the public site from the
        database, set{" "}
        <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-200">
          NEXT_PUBLIC_CATALOG_SOURCE=supabase
        </code>{" "}
        in <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-200">.env</code> (see{" "}
        <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-200">supabase/README.md</code>
        ).
      </p>
      <ul className="grid gap-3 text-sm sm:grid-cols-2">
        <li>
          <Link
            href="/admin/categories"
            className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-amber-500/40"
          >
            <span className="font-medium text-white">Categories</span>
            <span className="mt-1 block text-zinc-500">Slugs, titles, sort order</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-amber-500/40"
          >
            <span className="font-medium text-white">Products</span>
            <span className="mt-1 block text-zinc-500">CRUD, images, specs JSON</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/contacts"
            className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-amber-500/40"
          >
            <span className="font-medium text-white">Contact inbox</span>
            <span className="mt-1 block text-zinc-500">Submissions from the site form</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-amber-500/40"
          >
            <span className="font-medium text-white">Users</span>
            <span className="mt-1 block text-zinc-500">Super admin: create staff logins</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
