"use client";

import { Container } from "@/components/ui/container";
import { Gift, Headphones, RefreshCw, Truck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Export-friendly packing for wholesale programs",
  },
  {
    icon: RefreshCw,
    title: "Refund Policy",
    description: "Quality issues handled bench-to-bench with care",
  },
  {
    icon: Headphones,
    title: "Friendly Customer Support",
    description: "WhatsApp and email support for buyers worldwide",
  },
  {
    icon: Gift,
    title: "Gift Package",
    description: "Custom engraving and bespoke wedding pairs available",
  },
] as const;

export function FeaturesBarSection() {
  return (
    <section className="border-t border-border bg-background py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <Icon className="mx-auto size-8 text-[var(--drinkify-gold)]" strokeWidth={1.25} />
                <h3 className="font-heading mt-4 text-lg font-normal text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
