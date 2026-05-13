import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { whatsappHref, productInquiryMessage } from "@/lib/whatsapp";

export function ProductInquiryBar({ product }: { product: Product }) {
  const msg = productInquiryMessage(product.name);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Inquiry
        </p>
        <p className="mt-2 font-heading text-xl text-foreground">
          Request pricing for this SKU
        </p>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Share destination country and approximate volumes—we respond with MOQ options, finishes, and packing notes.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg">
          <Link href={`/contact?product=${encodeURIComponent(product.slug)}#quote`}>
            Request quote
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={whatsappHref(msg)} target="_blank" rel="noreferrer">
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
