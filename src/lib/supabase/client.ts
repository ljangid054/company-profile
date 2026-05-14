"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { normalizeSupabaseAnonKey, normalizeSupabaseUrl } from "@/lib/supabase/config";

export type CreateBrowserSupabaseOptions = {
  /**
   * Use for hash-based email redirects so we do not compete with the default
   * singleton client’s `detectSessionInUrl` + PKCE behaviour on the same page.
   */
  isolateForEmailRedirect?: boolean;
};

export function createBrowserSupabaseClient(options?: CreateBrowserSupabaseOptions) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = normalizeSupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (options?.isolateForEmailRedirect) {
    return createBrowserClient(url, anonKey, {
      isSingleton: false,
      auth: {
        detectSessionInUrl: false,
      },
    });
  }

  return createBrowserClient(url, anonKey);
}
