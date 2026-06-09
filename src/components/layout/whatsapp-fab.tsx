"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappHref } from "@/lib/whatsapp";

const defaultMsg =
  "Hello Somada Hookah — I'd like product details and export pricing for brass hookahs.";

export function WhatsAppFab() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={whatsappHref(defaultMsg)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex size-12 items-center justify-center bg-foreground text-background sm:bottom-8 sm:right-8"
      aria-label="Chat on WhatsApp"
      title="WhatsApp inquiry"
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
    >
      <MessageCircle className="size-5" aria-hidden />
    </motion.a>
  );
}
