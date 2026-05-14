import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type AdminRole = "super_admin" | "admin";

export type StaffContext = {
  userId: string;
  email: string | undefined;
  role: AdminRole;
};

export async function getStaffContext(): Promise<StaffContext | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user?.id) return null;

  const { data: profile, error: profErr } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profErr || !profile?.role) return null;
  if (profile.role !== "super_admin" && profile.role !== "admin") return null;

  return {
    userId: user.id,
    email: user.email,
    role: profile.role as AdminRole,
  };
}

export async function requireStaff(): Promise<StaffContext> {
  const ctx = await getStaffContext();
  if (!ctx) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/login");
  }
  return ctx!;
}

export async function requireSuperAdmin(): Promise<StaffContext> {
  const ctx = await requireStaff();
  if (ctx.role !== "super_admin") {
    const { redirect } = await import("next/navigation");
    redirect("/admin");
  }
  return ctx;
}
