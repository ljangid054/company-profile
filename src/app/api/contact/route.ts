import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";

const jsonBodySchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10),
  productSku: z.string().trim().optional(),
  locale: z.string().trim().optional(),
});

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Contact storage is not configured." },
      { status: 503 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  try {
    const supabase = createServiceRoleClient();

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const raw = {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        company: String(form.get("company") ?? ""),
        message: String(form.get("message") ?? ""),
        productSku: String(form.get("productSku") ?? ""),
        locale: String(form.get("locale") ?? "en"),
      };
      const parsed = jsonBodySchema.safeParse({
        ...raw,
        company: raw.company || undefined,
        productSku: raw.productSku || undefined,
      });
      if (!parsed.success) {
        return NextResponse.json(
          { ok: false, error: "Invalid form fields." },
          { status: 400 },
        );
      }

      let attachmentPath: string | null = null;
      const file = form.get("attachment");
      if (file instanceof File && file.size > 0) {
        if (file.size > MAX_FILE_BYTES) {
          return NextResponse.json(
            { ok: false, error: "Attachment is too large (max 5MB)." },
            { status: 400 },
          );
        }
        if (!ALLOWED_MIME.has(file.type)) {
          return NextResponse.json(
            { ok: false, error: "Unsupported file type." },
            { status: 400 },
          );
        }
        const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 120);
        const objectPath = `inbox/${Date.now()}-${safeName}`;
        const buf = Buffer.from(await file.arrayBuffer());
        const { error: upErr } = await supabase.storage
          .from("contact-files")
          .upload(objectPath, buf, {
            contentType: file.type,
            upsert: false,
          });
        if (upErr) {
          return NextResponse.json(
            { ok: false, error: "Could not store attachment." },
            { status: 500 },
          );
        }
        attachmentPath = objectPath;
      }

      const { error: insErr } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: parsed.data.company ?? null,
        message: parsed.data.message,
        product_sku: parsed.data.productSku ?? null,
        locale: parsed.data.locale ?? "en",
        attachment_path: attachmentPath,
      });

      if (insErr) {
        return NextResponse.json(
          { ok: false, error: "Could not save submission." },
          { status: 500 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    const body: unknown = await request.json();
    const parsed = jsonBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const { error: insErr } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company ?? null,
      message: parsed.data.message,
      product_sku: parsed.data.productSku ?? null,
      locale: parsed.data.locale ?? "en",
      attachment_path: null,
    });

    if (insErr) {
      return NextResponse.json(
        { ok: false, error: "Could not save submission." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
