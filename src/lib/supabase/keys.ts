/** Decode Supabase JWT role (`anon` | `service_role`) without verifying signature. */
export function supabaseKeyRole(key: string | undefined): string | null {
  const k = key?.trim();
  if (!k) return null;
  const parts = k.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
        "utf8",
      ),
    ) as { role?: string };
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

export function isValidServiceRoleKey(key: string | undefined): boolean {
  return supabaseKeyRole(key) === "service_role";
}
