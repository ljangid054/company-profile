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
        <div className="admin-panel max-w-md p-8 text-center">
          <p className="admin-heading text-lg font-semibold">Supabase is not configured</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add keys to <code className="bg-muted px-1">.env</code>
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
      <div className="admin-login-panel hidden flex-1 flex-col justify-between p-12 text-white lg:flex">
        <div>
          <p className="text-[13px] text-white/60">Somada Hookah</p>
          <h1 className="admin-heading mt-8 text-4xl font-semibold leading-tight">
            Admin Console
          </h1>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70">
            Manage products, categories, and export inquiries from one dashboard — aligned with
            your storefront.
          </p>
        </div>
        <p className="text-xs text-white/40">
          Staff access only · {siteConfig.contact.city}, {siteConfig.contact.region}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center bg-background px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="admin-heading text-2xl font-semibold text-foreground">Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account must exist in{" "}
            <code className="bg-muted px-1 text-xs">admin_profiles</code>.
          </p>

          {sp.error ? (
            <p className="mt-4 border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {decodeURIComponent(sp.error)}
            </p>
          ) : null}
          {sp.notice && NOTICE_COPY[sp.notice] ? (
            <p className="mt-4 border border-[var(--drinkify-gold)]/30 bg-[#f0ede0] px-3 py-2 text-sm text-[#5c5328]">
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

          <Link
            href="/"
            className="mt-8 block text-center text-sm text-muted-foreground transition-colors duration-500 hover:text-[var(--drinkify-orange)]"
          >
            ← Back to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
