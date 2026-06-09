import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogin } from "@/app/admin/actions";
import { getStaffContext } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

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
      <div className="admin-theme flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-lg font-semibold">Supabase is not configured</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add keys to <code className="rounded bg-muted px-1">.env</code>
          </p>
          <Link href="/" className="mt-6 inline-block text-sm text-primary hover:underline">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const staff = await getStaffContext();
  if (staff) redirect("/admin");

  return (
    <div className="admin-theme flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-[var(--admin-sidebar)] p-12 text-white lg:flex">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-white/60">Dataflow</p>
          <h1 className="mt-8 text-4xl font-bold leading-tight">
            {siteConfig.name}
            <br />
            Admin Console
          </h1>
          <p className="mt-4 max-w-sm text-white/60">
            Manage products, categories, and export inquiries from one dashboard.
          </p>
        </div>
        <p className="text-xs text-white/40">Staff access only · Somada workshop</p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account must exist in <code className="rounded bg-muted px-1 text-xs">admin_profiles</code>.
          </p>

          {sp.error ? (
            <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {decodeURIComponent(sp.error)}
            </p>
          ) : null}
          {sp.notice && NOTICE_COPY[sp.notice] ? (
            <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
              {NOTICE_COPY[sp.notice]}
            </p>
          ) : null}

          <form action={adminLogin} className="mt-8 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="mt-2 h-11 w-full">
              Sign in
            </Button>
          </form>

          <Link href="/" className="mt-8 block text-center text-sm text-muted-foreground hover:text-foreground">
            ← Back to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
