"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeVariant = "up" | "scale" | "blur" | "left";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: FadeVariant;
  /** Larger y offset for hero-style blocks */
  y?: number;
};

const variants: Record<
  FadeVariant,
  { hidden: Record<string, number | string>; show: Record<string, number | string> }
> = {
  up: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
  scale: {
    hidden: { opacity: 0, y: 12, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  left: { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  variant = "up",
  y,
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const v = variants[variant];
  const initial =
    variant === "up" && y !== undefined ? { ...v.hidden, y } : v.hidden;

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={v.show}
      viewport={{ once: true, margin: "-72px" }}
      transition={{
        duration: variant === "blur" ? 0.65 : 0.58,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
