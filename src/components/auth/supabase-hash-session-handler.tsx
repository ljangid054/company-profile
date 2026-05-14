"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Handles Supabase redirects that put data in the URL **hash** (fragment):
 * - Success: `#access_token=…&refresh_token=…` → setSession, then route on.
 * - Failure: `#error=…&error_code=otp_expired&error_description=…` → show message on login.
 */
export function SupabaseHashSessionHandler() {
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured() || typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash;
    if (!hash || hash.length < 2) {
      return;
    }

    const params = new URLSearchParams(hash.slice(1));

    function clearHashFromAddressBar() {
      const clean = new URL(window.location.href);
      clean.hash = "";
      window.history.replaceState(null, "", `${clean.pathname}${clean.search}`);
    }

    const hashError = params.get("error") ?? params.get("error_code");
    if (hashError) {
      let msg =
        params.get("error_description") ??
        params.get("error") ??
        "Email link is invalid or has expired.";
      try {
        msg = decodeURIComponent(msg.replace(/\+/g, " "));
      } catch {
        /* keep raw */
      }
      if (params.get("error_code") === "otp_expired" || hashError === "access_denied") {
        msg =
          "This sign-in or reset link has expired or was already used. Request a new password reset or magic link from Supabase (or your admin).";
      }
      clearHashFromAddressBar();
      router.replace(`/admin/login?error=${encodeURIComponent(msg)}`);
      return;
    }

    if (!hash.includes("access_token")) {
      return;
    }

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const type = params.get("type");

    if (!access_token || !refresh_token) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const supabase = createBrowserSupabaseClient({ isolateForEmailRedirect: true });
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (cancelled) return;
        if (error) {
          clearHashFromAddressBar();
          const hint =
            /failed to fetch/i.test(error.message) || error.name === "AuthRetryableFetchError"
              ? " Check NEXT_PUBLIC_SUPABASE_URL (https://…supabase.co, no spaces), resume the Supabase project if paused, disable strict blockers, and restart `next dev` after changing .env."
              : "";
          router.replace(
            `/admin/login?error=${encodeURIComponent(error.message + hint)}`,
          );
          return;
        }

        clearHashFromAddressBar();

        switch (type) {
          case "recovery":
            router.replace("/auth/update-password");
            break;
          case "signup":
            router.replace("/admin/login?notice=signup_confirmed");
            break;
          case "invite":
            router.replace("/auth/update-password?notice=invite");
            break;
          case "magiclink": {
            const nextMagic = params.get("next");
            router.replace(
              nextMagic && nextMagic.startsWith("/") && !nextMagic.startsWith("//")
                ? nextMagic
                : "/admin",
            );
            break;
          }
          case "email_change":
          case "email":
            router.replace("/admin/login?notice=email_updated");
            break;
          default: {
            const nextParam = params.get("next");
            router.replace(
              nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
                ? nextParam
                : "/admin",
            );
          }
        }
      } catch (e) {
        if (cancelled) return;
        clearHashFromAddressBar();
        let msg = e instanceof Error ? e.message : "session";
        if (/failed to fetch/i.test(msg)) {
          msg +=
            " — Check NEXT_PUBLIC_SUPABASE_URL / anon key in .env (no leading spaces), resume the Supabase project if paused, and try another browser without strict tracking protection.";
        }
        router.replace(`/admin/login?error=${encodeURIComponent(msg)}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
