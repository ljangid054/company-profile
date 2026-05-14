import Link from "next/link";
import { isSupabaseCatalogEnabled, isSupabaseConfigured } from "@/lib/supabase/env";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminHomePage() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const storefrontFromDb = isSupabaseCatalogEnabled();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {storefrontFromDb ? (
          <>
            The public site is reading <strong className="text-foreground">categories and products
            from Supabase</strong> (same tables you edit here). Set{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              NEXT_PUBLIC_CATALOG_SOURCE=static
            </code>{" "}
            in <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">.env</code>{" "}
            only if you want the bundled JSON catalog instead.
          </>
        ) : (
          <>
            The public site is using <strong className="text-foreground">static JSON</strong> for the
            catalog. Remove{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              NEXT_PUBLIC_CATALOG_SOURCE=static
            </code>{" "}
            (or unset it) so the storefront uses Postgres again — see{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              supabase/README.md
            </code>
            .
          </>
        )}
      </p>
      <ul className="grid gap-3 text-sm sm:grid-cols-2">
        <li>
          <Link href="/admin/categories">
            <Card className="h-full transition-colors hover:border-primary/35">
              <CardContent className="pt-5">
                <span className="font-medium text-foreground">Categories</span>
                <span className="mt-1 block text-muted-foreground">Slugs, titles, sort order</span>
              </CardContent>
            </Card>
          </Link>
        </li>
        <li>
          <Link href="/admin/products">
            <Card className="h-full transition-colors hover:border-primary/35">
              <CardContent className="pt-5">
                <span className="font-medium text-foreground">Products</span>
                <span className="mt-1 block text-muted-foreground">CRUD, images, specs JSON</span>
              </CardContent>
            </Card>
          </Link>
        </li>
        <li>
          <Link href="/admin/contacts">
            <Card className="h-full transition-colors hover:border-primary/35">
              <CardContent className="pt-5">
                <span className="font-medium text-foreground">Contact inbox</span>
                <span className="mt-1 block text-muted-foreground">
                  Submissions from the site form
                </span>
              </CardContent>
            </Card>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <Card className="h-full transition-colors hover:border-primary/35">
              <CardContent className="pt-5">
                <span className="font-medium text-foreground">Users</span>
                <span className="mt-1 block text-muted-foreground">
                  Super admin: create staff logins
                </span>
              </CardContent>
            </Card>
          </Link>
        </li>
      </ul>
    </div>
  );
}
