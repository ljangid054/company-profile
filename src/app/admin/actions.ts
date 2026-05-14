"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { requireStaff, requireSuperAdmin } from "@/lib/supabase/admin-auth";

function revalidateCatalog() {
  revalidateTag("supabase-products", "max");
  revalidateTag("supabase-categories", "max");
  revalidateTag("catalog-products", "max");
  revalidatePath("/", "layout");
  revalidatePath("/products", "layout");
  revalidatePath("/sitemap.xml");
}

function splitLines(raw: string): string[] {
  return raw
    .split(/[\n,|]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function adminLogin(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/admin");
}

export async function upsertCategory(formData: FormData) {
  await requireStaff();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = Number(String(formData.get("sort_order") ?? "0")) || 0;
  if (!slug || !title) {
    redirect("/admin/categories?error=missing-fields");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("categories").upsert(
    {
      slug,
      title,
      description,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }
  revalidateCatalog();
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireStaff();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) redirect("/admin/categories");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("categories").delete().eq("slug", slug);
  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }
  revalidateCatalog();
  redirect("/admin/categories");
}

export async function upsertProduct(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const category_slug = String(formData.get("category_slug") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const short_description = String(formData.get("short_description") ?? "").trim();
  const material = String(formData.get("material") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim() || null;
  const featured = String(formData.get("featured") ?? "") === "on";
  const imagesRaw = String(formData.get("images") ?? "");
  const images = imagesRaw
    .split(/[\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  let specifications: { label: string; value: string }[] = [];
  const specsJson = String(formData.get("specifications_json") ?? "").trim();
  if (specsJson) {
    try {
      const parsed: unknown = JSON.parse(specsJson);
      if (Array.isArray(parsed)) {
        specifications = parsed.filter(
          (r): r is { label: string; value: string } =>
            !!r &&
            typeof r === "object" &&
            "label" in r &&
            "value" in r &&
            typeof (r as { label: unknown }).label === "string" &&
            typeof (r as { value: unknown }).value === "string",
        );
      }
    } catch {
      redirect("/admin/products?error=invalid-spec-json");
    }
  }

  const finishes = splitLines(String(formData.get("finishes") ?? ""));
  const sizes = splitLines(String(formData.get("sizes") ?? ""));
  const features = splitLines(String(formData.get("features") ?? ""));
  const applications = splitLines(String(formData.get("applications") ?? ""));

  if (!category_slug || !slug || !name) {
    redirect("/admin/products?error=missing-fields");
  }

  const supabase = await createServerSupabaseClient();
  const row = {
    category_slug,
    slug,
    name,
    short_description,
    material,
    price,
    featured,
    images,
    specifications,
    finishes,
    sizes,
    features,
    applications,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("products").update(row).eq("id", id);
    if (error) {
      redirect(`/admin/products/${id}?error=${encodeURIComponent(error.message)}`);
    }
  } else {
    const { error } = await supabase.from("products").insert(row);
    if (error) {
      redirect(`/admin/products/new?error=${encodeURIComponent(error.message)}`);
    }
  }

  revalidateCatalog();
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/admin/products");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    redirect(`/admin/products?error=${encodeURIComponent(error.message)}`);
  }
  revalidateCatalog();
  redirect("/admin/products");
}

export async function createStaffUser(formData: FormData) {
  await requireSuperAdmin();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = "admin" as const;

  if (!email || password.length < 8) {
    redirect("/admin/users?error=invalid-input");
  }

  const admin = createServiceRoleClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) {
    redirect(`/admin/users?error=${encodeURIComponent(error?.message ?? "create-failed")}`);
  }

  const { error: pErr } = await admin.from("admin_profiles").insert({
    user_id: data.user.id,
    role,
  });
  if (pErr) {
    redirect(`/admin/users?error=${encodeURIComponent(pErr.message)}`);
  }

  redirect("/admin/users?created=1");
}
