import Link from "next/link";
import { requireStaff } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOutAdmin } from "@/app/admin/actions";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6">
        <div className="rounded-lg border border-amber-500/30 bg-amber-950/25 p-4 text-sm text-amber-100">
          Supabase URL and anon key are not set. Add them to{" "}
          <code className="rounded bg-zinc-950 px-1 py-0.5 text-amber-50">.env</code> — see{" "}
          <code className="rounded bg-zinc-950 px-1 py-0.5 text-amber-50">supabase/README.md</code>.
        </div>
        <div className="mt-8">{children}</div>
      </div>
    );
  }

  const staff = await requireStaff();

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <Link href="/admin" className="font-heading text-xl text-white">
            Admin
          </Link>
          <p className="mt-1 text-xs text-zinc-500">
            {staff.email ?? staff.userId} · {staff.role.replace("_", " ")}
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            href="/admin/categories"
          >
            Categories
          </Link>
          <Link
            className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            href="/admin/products"
          >
            Products
          </Link>
          <Link
            className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            href="/admin/contacts"
          >
            Contacts
          </Link>
          {staff.role === "super_admin" ? (
            <Link
              className="rounded-lg px-3 py-1.5 text-amber-200/90 hover:bg-zinc-800 hover:text-amber-100"
              href="/admin/users"
            >
              Users
            </Link>
          ) : null}
          <Link className="rounded-lg px-3 py-1.5 text-zinc-500 hover:text-white" href="/">
            Site
          </Link>
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:bg-zinc-900"
            >
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <div className="mt-10 flex-1">{children}</div>
    </div>
  );
}
