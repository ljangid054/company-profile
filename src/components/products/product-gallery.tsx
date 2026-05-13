"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE } from "@/config/visual";

type Props = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const safe = images.length ? images : [DEFAULT_PRODUCT_IMAGE];
  const current = safe[Math.min(active, safe.length - 1)] ?? safe[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-muted/40 to-muted/15">
        <Image
          src={current}
          alt={`${productName} — primary visual`}
          fill
          priority
          className="object-contain object-center p-4 sm:p-6"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="backdrop-blur-sm"
            onClick={() => setOpen(true)}
          >
            <Maximize2 className="size-4" />
            Enlarge
          </Button>
        </div>
      </div>

      {safe.length > 1 ? (
        <div className="flex flex-wrap gap-3">
          {safe.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "relative size-20 overflow-hidden rounded-xl border bg-muted/30 text-left sm:size-24",
                idx === active
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border/60 hover:border-primary/40",
              )}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-contain object-center p-1"
                sizes="96px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-border/70 bg-background p-3 sm:p-5">
          <DialogTitle className="sr-only">{productName} — enlarged image</DialogTitle>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted/30">
            <Image
              src={current}
              alt={`${productName} enlarged`}
              fill
              className="object-contain"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
