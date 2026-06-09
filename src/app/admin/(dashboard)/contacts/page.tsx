import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminContactsPage() {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-muted-foreground">Configure Supabase to view inquiries.</p>;
  }
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("contact_submissions")
    .select("id,name,email,phone,company,message,product_sku,attachment_path,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return <p className="text-sm text-destructive">Could not load contacts: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Submissions from the public contact form. Files live in the{" "}
        <code className="rounded bg-muted px-1 text-xs">contact-files</code> bucket.
      </p>

      <div className="admin-table-wrap overflow-x-auto">
        <table className="w-full min-w-[960px] text-left">
          <thead>
            <tr>
              <th>When</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>SKU</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="align-top">
                <td className="text-xs text-muted-foreground whitespace-nowrap">
                  {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                </td>
                <td className="font-medium text-foreground">{r.name}</td>
                <td className="text-muted-foreground">{r.email}</td>
                <td className="text-muted-foreground">{r.phone}</td>
                <td className="text-xs text-muted-foreground">{r.product_sku ?? "—"}</td>
                <td className="max-w-xs text-sm text-muted-foreground">{r.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
