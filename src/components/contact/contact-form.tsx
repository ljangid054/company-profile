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

    if (!ajaxUrl) {
      toast.error("Form endpoint not configured.");
      return;
    }

    startTransition(async () => {
      try {
        const subject =
          `Somada inquiry — ${parsed.data.company?.trim() ? parsed.data.company : parsed.data.name}`;
        const res = await fetch(ajaxUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone,
            company: parsed.data.company ?? "",
            message: parsed.data.message,
            _subject: subject,
            _template: "table",
          }),
        });

        if (!res.ok) {
          throw new Error("Request failed");
        }

        toast.success("Message sent — our workshop desk will reply shortly.");
        setValues({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
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
          This form posts through FormSubmit’s AJAX endpoint. Replace{" "}
          <span className="text-foreground">{siteConfig.contact.email}</span> in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">src/config/site.ts</code>{" "}
          with your verified inbox before launch.
        </p>
      </div>
    </div>
  );
}
