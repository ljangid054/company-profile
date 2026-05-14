import Link from "next/link";
import { requireStaff } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOutAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6">
        <div className="rounded-xl border border-primary/35 bg-primary/10 p-4 text-sm text-foreground">
          Supabase URL and anon key are not set. Add them to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            .env
          </code>{" "}
          — see{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            supabase/README.md
          </code>
          .
        </div>
        <div className="mt-8">{children}</div>
      </div>
    );
  }

  const staff = await requireStaff();

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link href="/admin" className="font-heading text-xl text-foreground hover:text-primary">
            Admin
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            {staff.email ?? staff.userId} · {staff.role.replace("_", " ")}
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-1.5 text-sm">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/categories">Categories</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/products">Products</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/contacts">Contacts</Link>
          </Button>
          {staff.role === "super_admin" ? (
            <Button variant="ghost" size="sm" className="text-primary" asChild>
              <Link href="/admin/users">Users</Link>
            </Button>
          ) : null}
          <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
            <Link href="/">Site</Link>
          </Button>
          <form action={signOutAdmin} className="inline">
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </nav>
      </header>
      <div className="mt-10 flex-1">{children}</div>
    </div>
  );
}
