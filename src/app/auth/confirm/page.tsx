"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Handles email links that use **query** params (`token_hash` + `type`) instead of a hash.
 * Configure the relevant Supabase email template redirect to include
 * `/auth/confirm?token_hash={{ .TokenHash }}&type={{ .TokenType }}` if you use the token-hash flow.
 * Default Supabase links often use the hash flow instead; see SupabaseHashSessionHandler.
 */
function AuthConfirmInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Verifying your link…");

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setStatus("Supabase is not configured.");
      return;
    }

    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next") ?? "/admin";

    if (!token_hash || !type) {
      setStatus("This link is missing verification parameters. Request a new email from Supabase.");
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const supabase = createBrowserSupabaseClient({ isolateForEmailRedirect: true });
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as "signup" | "invite" | "magiclink" | "recovery" | "email_change" | "email",
        });
        if (cancelled) return;
        if (error) {
          router.replace(`/admin/login?error=${encodeURIComponent(error.message)}`);
          return;
        }

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
          case "magiclink":
            router.replace(
              next.startsWith("/") && !next.startsWith("//") ? next : "/admin",
            );
            break;
          case "email_change":
          case "email":
            router.replace("/admin/login?notice=email_updated");
            break;
          default:
            router.replace("/admin");
        }
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Verification failed";
        router.replace(`/admin/login?error=${encodeURIComponent(msg)}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-md flex-col justify-center px-6 py-16 text-center text-sm text-muted-foreground">
      {status}
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-6 py-16 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <AuthConfirmInner />
    </Suspense>
  );
}
