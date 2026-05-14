import { createClient } from "@supabase/supabase-js";
import { normalizeSupabaseUrl } from "@/lib/supabase/config";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";

export function createServiceRoleClient() {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    throw new Error("Supabase service role is not configured.");
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is empty.");
  }
  return createClient(normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
