import { createClient } from "@supabase/supabase-js";
import { normalizeSupabaseAnonKey, normalizeSupabaseUrl } from "@/lib/supabase/config";
import { isSupabaseConfigured, isServiceRoleConfigured } from "@/lib/supabase/env";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

/** Service role when valid; otherwise anon (needs contact_submissions insert RLS policy). */
export function createContactWriteClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  if (isServiceRoleConfigured()) {
    return createServiceRoleClient();
  }
  return createClient(
    normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
    normalizeSupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
