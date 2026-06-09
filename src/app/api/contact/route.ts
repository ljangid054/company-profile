import { NextResponse } from "next/server";
import { z } from "zod";
import { createContactWriteClient } from "@/lib/supabase/contact-client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isValidServiceRoleKey } from "@/lib/supabase/keys";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

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

type ContactRow = {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  product_sku: string | null;
  locale: string;
  attachment_path: string | null;
};

async function saveSubmission(row: ContactRow) {
  const supabase = createContactWriteClient();
  const { error } = await supabase.from("contact_submissions").insert(row);
  return error;
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Contact storage is not configured." },
      { status: 503 },
    );
  }

  const serviceRoleRaw = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (serviceRoleRaw && !isValidServiceRoleKey(serviceRoleRaw)) {
    console.warn(
      "[contact] SUPABASE_SERVICE_ROLE_KEY is set but is not a service_role JWT — using anon key for inserts. Fix the key in your host env.",
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  try {
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
        if (!isValidServiceRoleKey(serviceRoleRaw)) {
          return NextResponse.json(
            {
              ok: false,
              error:
                "File uploads need a valid SUPABASE_SERVICE_ROLE_KEY on the server.",
            },
            { status: 503 },
          );
        }
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
        const supabase = createServiceRoleClient();
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
          console.error("[contact] attachment upload:", upErr.message);
          return NextResponse.json(
            { ok: false, error: "Could not store attachment." },
            { status: 500 },
          );
        }
        attachmentPath = objectPath;
      }

      const insErr = await saveSubmission({
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
        console.error("[contact] insert:", insErr.message, insErr.code);
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

    const insErr = await saveSubmission({
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
      console.error("[contact] insert:", insErr.message, insErr.code);
      return NextResponse.json(
        { ok: false, error: "Could not save submission." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
