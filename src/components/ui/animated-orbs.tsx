"use client";

import { cn } from "@/lib/utils";

type AnimatedOrbsProps = {
  className?: string;
  intensity?: "subtle" | "hero";
};

export function AnimatedOrbs({ className, intensity = "hero" }: AnimatedOrbsProps) {
  const opacity = intensity === "hero" ? "opacity-70" : "opacity-40";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "animate-orb-1 absolute -left-[10%] top-[5%] size-[55vw] max-w-[520px] rounded-full blur-3xl motion-reduce:animate-none",
          opacity,
        )}
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.19 42 / 0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className={cn(
          "animate-orb-2 absolute -right-[8%] top-[20%] size-[45vw] max-w-[440px] rounded-full blur-3xl motion-reduce:animate-none",
          opacity,
        )}
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.12 285 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className={cn(
          "animate-orb-3 absolute bottom-[10%] left-[25%] size-[40vw] max-w-[380px] rounded-full blur-3xl motion-reduce:animate-none",
          opacity,
        )}
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.16 25 / 0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
