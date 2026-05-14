"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z.string().trim().min(8, "Enter a reachable phone / WhatsApp."),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us quantities, country, and timelines."),
});

type FormValues = z.infer<typeof schema>;

function buildAjaxEndpoint(actionUrl: string): string | null {
  try {
    const u = new URL(actionUrl);
    if (!u.hostname.endsWith("formsubmit.co")) return null;
    const email = u.pathname.replace(/^\//, "").split("/")[0];
    if (!email) return null;
    return `https://formsubmit.co/ajax/${email}`;
  } catch {
    return null;
  }
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const sku = searchParams.get("product");
  const seededRef = useRef(false);

  function clearAttachmentInput() {
    const el = document.getElementById("contact-attachment") as HTMLInputElement | null;
    if (el) el.value = "";
  }

  const ajaxUrl = useMemo(
    () => buildAjaxEndpoint(siteConfig.formSubmitAction),
    [],
  );

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);

  useEffect(() => {
    if (!sku || seededRef.current) return;
    seededRef.current = true;
    setValues((prev) => ({
      ...prev,
      message: `I'm interested in SKU "${sku}" — please share MOQ, finishes, and export packing.`,
    }));
  }, [sku]);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [pending, startTransition] = useTransition();

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function submitViaFormSubmit(parsed: z.infer<typeof schema>) {
    if (!ajaxUrl) {
      toast.error("Form endpoint not configured.");
      return false;
    }
    const subject =
      `Somada inquiry — ${parsed.company?.trim() ? parsed.company : parsed.name}`;
    const res = await fetch(ajaxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        company: parsed.company ?? "",
        message: parsed.message,
        _subject: subject,
        _template: "table",
      }),
    });
    if (!res.ok) {
      throw new Error("Request failed");
    }
    return true;
  }

  async function submit() {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        phone: flattened.phone?.[0],
        company: flattened.company?.[0],
        message: flattened.message?.[0],
      });
      toast.error("Please fix the highlighted fields.");
      return;
    }

    startTransition(async () => {
      try {
        let res: Response;
        if (attachment) {
          const fd = new FormData();
          fd.append("name", parsed.data.name);
          fd.append("email", parsed.data.email);
          fd.append("phone", parsed.data.phone);
          fd.append("company", parsed.data.company ?? "");
          fd.append("message", parsed.data.message);
          if (sku) fd.append("productSku", sku);
          fd.append("locale", "en");
          fd.append("attachment", attachment);
          res = await fetch("/api/contact", { method: "POST", body: fd });
        } else {
          res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name: parsed.data.name,
              email: parsed.data.email,
              phone: parsed.data.phone,
              company: parsed.data.company,
              message: parsed.data.message,
              productSku: sku ?? undefined,
              locale: "en",
            }),
          });
        }

        if (res.status === 503) {
          if (attachment && !ajaxUrl) {
            toast.error(
              "File uploads need Supabase configured with SUPABASE_SERVICE_ROLE_KEY on the server.",
            );
            return;
          }
          if (!ajaxUrl) {
            toast.error("Contact storage is not configured.");
            return;
          }
          const ok = await submitViaFormSubmit(parsed.data);
          if (ok) {
            toast.success("Message sent — our workshop desk will reply shortly.");
            setValues({
              name: "",
              email: "",
              phone: "",
              company: "",
              message: "",
            });
            setAttachment(null);
            clearAttachmentInput();
          }
          return;
        }

        const body: unknown = await res.json().catch(() => ({}));
        const errMsg =
          body &&
          typeof body === "object" &&
          "error" in body &&
          typeof (body as { error: unknown }).error === "string"
            ? (body as { error: string }).error
            : "Could not send right now.";

        if (!res.ok) {
          toast.error(errMsg);
          return;
        }

        toast.success("Message sent — our workshop desk will reply shortly.");
        setValues({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setAttachment(null);
        clearAttachmentInput();
      } catch {
        toast.error("Could not send right now. Try WhatsApp or email.");
      }
    });
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-8">
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {fieldErrors.name ? (
            <p className="text-xs text-destructive">{fieldErrors.name}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email ? (
              <p className="text-xs text-destructive">{fieldErrors.email}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone / WhatsApp</Label>
            <Input
              id="phone"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            {fieldErrors.phone ? (
              <p className="text-xs text-destructive">{fieldErrors.phone}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="company">Company / lounge (optional)</Label>
          <Input
            id="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">Project details</Label>
          <Textarea
            id="message"
            rows={6}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            placeholder="Quantities, SKUs, destination country, incoterms context, finishing preferences…"
          />
          {fieldErrors.message ? (
            <p className="text-xs text-destructive">{fieldErrors.message}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-attachment">Reference image (optional, max 5MB)</Label>
          <Input
            id="contact-attachment"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setAttachment(f ?? null);
            }}
          />
          <p className="text-xs text-muted-foreground">
            JPEG, PNG, WebP, or GIF. Stored in Supabase when the contact API is configured.
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full sm:w-auto"
          disabled={pending}
          onClick={() => void submit()}
        >
          {pending ? "Sending…" : "Send inquiry"}
        </Button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          When Supabase is configured (see <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">supabase/README.md</code>
          ), inquiries are saved in Postgres and optional images in a private bucket. If the API is
          unavailable, the form may fall back to FormSubmit — keep{" "}
          <span className="text-foreground">{siteConfig.contact.email}</span> verified in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">src/config/site.ts</code>.
        </p>
      </div>
    </div>
  );
}
