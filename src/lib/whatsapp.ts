import { siteConfig } from "@/config/site";

/** Build wa.me link with optional prefilled message */
export function whatsappHref(message?: string): string {
  const num = siteConfig.contact.whatsappE164.replace(/\D/g, "");
  const base = `https://wa.me/${num}`;
  if (!message?.trim()) return base;
  const text = encodeURIComponent(message.trim());
  return `${base}?text=${text}`;
}

export function productInquiryMessage(productName: string): string {
  return `Hello Somada Hookah — I'd like a quotation for: ${productName}. Please share MOQ, finishes, and export packing options.`;
}
