"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthUpdatePasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invite = searchParams.get("notice") === "invite";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-muted-foreground">
        Supabase is not configured.
      </div>
    );
  }

  async function submit() {
    if (password.length < 8) {
      toast.error("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setPending(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Password saved. You can sign in now.");
      router.replace("/admin/login");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-heading text-2xl text-foreground">
        {invite ? "Choose your password" : "Set a new password"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {invite
          ? "You accepted an invitation. Create a password to finish setting up your Somada Hookah admin account."
          : "You used a password reset link. Choose a new password for your account."}
      </p>

      <div className="mt-8 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="npw">New password</Label>
          <Input
            id="npw"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="npw2">Confirm password</Label>
          <Input
            id="npw2"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Button type="button" disabled={pending} onClick={() => void submit()}>
          {pending ? "Saving…" : "Save password"}
        </Button>
        <Link
          href="/admin/login"
          className="text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Back to admin sign in
        </Link>
      </div>
    </div>
  );
}

export default function AuthUpdatePasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-6 py-16 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <AuthUpdatePasswordInner />
    </Suspense>
  );
}
