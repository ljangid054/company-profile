import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminContactsPage() {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-zinc-500">Configure Supabase to view contact submissions.</p>;
  }
  const supabase = await createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("contact_submissions")
    .select("id,name,email,phone,company,message,product_sku,attachment_path,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return <p className="text-sm text-red-400">Could not load contacts: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-white">Contact submissions</h1>
      <p className="max-w-2xl text-sm text-zinc-500">
        Rows are created by the public contact form via the secure API route. Optional files live
        in the private <code className="text-zinc-300">contact-files</code> bucket; paths are shown
        below—open them from the Supabase dashboard or add a signed-URL viewer later.
      </p>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-3 py-3">When</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">SKU</th>
              <th className="px-3 py-3">File</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="border-b border-zinc-800/80 align-top last:border-0">
                <td className="px-3 py-3 text-xs text-zinc-500">
                  {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                </td>
                <td className="px-3 py-3 text-zinc-200">{r.name}</td>
                <td className="px-3 py-3 text-zinc-300">{r.email}</td>
                <td className="px-3 py-3 text-zinc-400">{r.phone}</td>
                <td className="px-3 py-3 text-xs text-zinc-500">{r.product_sku ?? "—"}</td>
                <td className="px-3 py-3 font-mono text-[11px] text-zinc-500">
                  {r.attachment_path ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <details className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-400">
        <summary className="cursor-pointer text-zinc-200">Message preview (first row)</summary>
        {rows?.[0]?.message ? (
          <p className="mt-3 whitespace-pre-wrap text-zinc-300">{rows[0].message}</p>
        ) : (
          <p className="mt-3">No submissions yet.</p>
        )}
      </details>
    </div>
  );
}
