"use client";

import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";

const defaultMsg =
  "Hello Somada Hookah — I'd like product details and export pricing for brass hookahs.";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref(defaultMsg)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex size-12 items-center justify-center bg-[var(--drinkify-gold)] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      aria-label="Chat on WhatsApp"
      title="WhatsApp inquiry"
    >
      <MessageCircle className="size-5" aria-hidden />
    </a>
  );
}
