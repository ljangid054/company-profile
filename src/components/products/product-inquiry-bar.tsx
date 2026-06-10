import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { whatsappHref, productInquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function ProductInquiryBar({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const msg = productInquiryMessage(product.name);
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border border-border bg-secondary/30 p-6 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Inquiry</p>
        <p className="mt-2 font-heading text-lg font-semibold">Request pricing for this SKU</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Share destination country and approximate volumes—we respond with MOQ options, finishes,
          and packing notes.
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
