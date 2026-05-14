import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogin } from "@/app/admin/actions";
import { getStaffContext } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const NOTICE_COPY: Record<string, string> = {
  signup_confirmed:
    "Your email is confirmed. Sign in below. If you still cannot open Admin, ask a super admin to add your account in admin_profiles.",
  email_updated:
    "Your email was updated. Use the new address (or your existing password) to sign in below.",
};

type Props = { searchParams: Promise<{ error?: string; notice?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-lg text-white">Supabase is not configured</p>
        <p className="mt-3 text-sm text-zinc-500">
          Add keys to <code className="text-zinc-300">.env</code> (see{" "}
          <code className="text-zinc-300">supabase/README.md</code>).
        </p>
        <Link href="/" className="mt-8 inline-block text-amber-400 hover:underline">
          Home
        </Link>
      </div>
    );
  }

  const staff = await getStaffContext();
  if (staff) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-heading text-3xl text-white">Admin sign in</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Staff accounts only — your user must exist in{" "}
        <code className="text-zinc-300">admin_profiles</code>.
      </p>
      {sp.error ? (
        <p className="mt-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {decodeURIComponent(sp.error)}
        </p>
      ) : null}
      {sp.notice && NOTICE_COPY[sp.notice] ? (
        <p className="mt-4 rounded-lg border border-emerald-500/35 bg-emerald-950/35 px-3 py-2 text-sm text-emerald-200">
          {NOTICE_COPY[sp.notice]}
        </p>
      ) : null}

      <form action={adminLogin} className="mt-8 grid gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-zinc-400">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-zinc-400">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-black hover:bg-amber-500"
        >
          Sign in
        </button>
      </form>

      <Link href="/" className="mt-10 text-center text-sm text-zinc-500 hover:text-white">
        ← Back to site
      </Link>
    </div>
  );
}
