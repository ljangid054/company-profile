"use client";

import { cn } from "@/lib/utils";

type HorizontalMarqueeProps = {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "normal";
};

export function HorizontalMarquee({
  children,
  className,
  speed = "normal",
}: HorizontalMarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-8 motion-safe:animate-marquee",
          speed === "slow" && "[animation-duration:60s]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
