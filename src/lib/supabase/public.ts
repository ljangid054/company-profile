import { createClient } from "@supabase/supabase-js";
import { normalizeSupabaseAnonKey, normalizeSupabaseUrl } from "@/lib/supabase/config";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/** Server-side catalog reads (no cookies; safe for SSG / unstable_cache). */
export function createPublicSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase URL and anon key are not configured.");
  }
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anon = normalizeSupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
