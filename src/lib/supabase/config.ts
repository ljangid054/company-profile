/**
 * Normalizes Supabase env values so browser fetch() targets a valid origin.
 * Common issues: leading spaces in `.env`, missing `https://`, trailing slashes.
 */
export function normalizeSupabaseUrl(raw: string | undefined): string {
  const t = raw?.trim() ?? "";
  if (!t) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is empty.");
  }
  const withProto = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  let u: URL;
  try {
    u = new URL(withProto);
  } catch {
    throw new Error(`NEXT_PUBLIC_SUPABASE_URL is not a valid URL: ${JSON.stringify(t)}`);
  }
  if (u.hostname.endsWith(".supabase.co") && u.protocol !== "https:") {
    u.protocol = "https:";
  }
  return u.origin.replace(/\/$/, "");
}

export function normalizeSupabaseAnonKey(raw: string | undefined): string {
  const k = raw?.trim() ?? "";
  if (!k) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is empty.");
  }
  return k;
}
