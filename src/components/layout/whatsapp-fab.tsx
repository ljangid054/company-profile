"use client";

import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";

const defaultMsg =
  "Hello Somada Hookah — I’d like product details and export pricing for brass hookahs.";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref(defaultMsg)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#062d18] shadow-lg shadow-black/40 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-8 sm:right-8"
      aria-label="Chat on WhatsApp"
      title="WhatsApp inquiry"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
