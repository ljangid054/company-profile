import { createStaffUser } from "@/app/admin/actions";
import { requireSuperAdmin } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type Props = { searchParams: Promise<{ error?: string; created?: string }> };

export default async function AdminUsersPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-zinc-500">Configure Supabase to manage users.</p>;
  }
  await requireSuperAdmin();
  const sp = await searchParams;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-white">Staff users</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">
          Creates a Supabase Auth user and an <code className="text-zinc-300">admin_profiles</code>{" "}
          row with role <code className="text-zinc-300">admin</code>. Grant another{" "}
          <code className="text-zinc-300">super_admin</code> only via SQL in the Supabase dashboard.
        </p>
        {sp.error ? (
          <p className="mt-2 text-sm text-red-400">{decodeURIComponent(sp.error)}</p>
        ) : null}
        {sp.created ? (
          <p className="mt-2 text-sm text-emerald-400">User created. They can sign in now.</p>
        ) : null}
      </div>

      <section className="max-w-md rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="font-heading text-lg text-white">Create user</h2>
        <form action={createStaffUser} className="mt-4 grid gap-4">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Email</span>
            <input
              name="email"
              type="email"
              required
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Password (min 8 characters)</span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-black hover:bg-amber-500"
          >
            Create user
          </button>
        </form>
      </section>
    </div>
  );
}
