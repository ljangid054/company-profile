import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { normalizeSupabaseAnonKey, normalizeSupabaseUrl } from "@/lib/supabase/config";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function createServerSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const cookieStore = await cookies();
  return createServerClient(
    normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
    normalizeSupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            /* set from a Server Component */
          }
        },
      },
    },
  );
}
