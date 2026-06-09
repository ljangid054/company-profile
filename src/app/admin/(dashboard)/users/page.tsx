import { createStaffUser } from "@/app/admin/actions";
import { requireSuperAdmin } from "@/lib/supabase/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { searchParams: Promise<{ error?: string; created?: string }> };

export default async function AdminUsersPage({ searchParams }: Props) {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-muted-foreground">Configure Supabase to manage users.</p>;
  }
  await requireSuperAdmin();
  const sp = await searchParams;

  return (
    <div className="space-y-8">
      <p className="max-w-xl text-sm text-muted-foreground">
        Creates a Supabase Auth user and an <code className="rounded bg-muted px-1 text-xs">admin_profiles</code>{" "}
        row with role <code className="rounded bg-muted px-1 text-xs">admin</code>.
      </p>
      {sp.error ? (
        <p className="text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
      ) : null}
      {sp.created ? (
        <p className="text-sm text-emerald-600">User created. They can sign in now.</p>
      ) : null}

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Create user</CardTitle>
          <CardDescription>Super admin only</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createStaffUser} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password (min 8 characters)</Label>
              <Input id="password" name="password" type="password" required minLength={8} />
            </div>
            <Button type="submit">Create user</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
