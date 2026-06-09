export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

/**
 * Storefront categories/products: read from Supabase when URL + anon key exist,
 * unless explicitly forced to static JSON (see `NEXT_PUBLIC_CATALOG_SOURCE`).
 */
export function isSupabaseCatalogEnabled(): boolean {
  if (!isSupabaseConfigured()) return false;
  const mode = process.env.NEXT_PUBLIC_CATALOG_SOURCE?.trim().toLowerCase();
  if (mode === "static" || mode === "json" || mode === "local") return false;
  return true;
}

import { isValidServiceRoleKey } from "@/lib/supabase/keys";

export function isServiceRoleConfigured(): boolean {
  return isValidServiceRoleKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
