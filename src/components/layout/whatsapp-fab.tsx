"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappHref } from "@/lib/whatsapp";

const defaultMsg =
  "Hello Somada Hookah — I’d like product details and export pricing for brass hookahs.";

export function WhatsAppFab() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={whatsappHref(defaultMsg)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#062d18] shadow-xl shadow-[#25D366]/35 sm:bottom-8 sm:right-8"
      aria-label="Chat on WhatsApp"
      title="WhatsApp inquiry"
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {!reduce ? (
        <span
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]/60"
          aria-hidden
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-[#25D366]/50" />
        </span>
      ) : null}
      <MessageCircle className="relative z-10 size-7" aria-hidden />
    </motion.a>
  );
}
