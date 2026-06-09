import Link from "next/link";
import { requireStaff } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
        <div className="rounded-xl border border-primary/30 bg-card p-6 text-sm shadow-sm">
          <p className="font-semibold text-foreground">Supabase not configured</p>
          <p className="mt-2 text-muted-foreground">
            Add URL and anon key to <code className="rounded bg-muted px-1">.env</code> — see{" "}
            <code className="rounded bg-muted px-1">supabase/README.md</code>.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">
            ← Back to site
          </Link>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    );
  }

  const staff = await requireStaff();

  return (
    <AdminLayoutClient email={staff.email} role={staff.role}>
      {children}
    </AdminLayoutClient>
  );
}
