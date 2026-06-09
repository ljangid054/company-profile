"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/whatsapp";

const mainNav = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsActive = pathname.startsWith("/products");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "px-3 pt-3 sm:px-4 sm:pt-4" : "px-0 pt-0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-[3.75rem] items-center transition-all duration-500 sm:h-16",
            scrolled
              ? "max-w-6xl rounded-2xl border border-border/60 bg-background/85 px-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-4"
              : "max-w-none border-b border-border/30 bg-background/40 backdrop-blur-md",
          )}
        >
          <Container
            className={cn(
              "flex h-full w-full items-center justify-between gap-3",
              scrolled && "!max-w-none !px-0",
            )}
          >
            {/* Brand */}
            <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
              <BrandLogo
                framed
                priority
                className="h-10 w-10 sm:h-11 sm:w-11"
              />
              <div className="min-w-0">
                <span className="block truncate text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {siteConfig.name}
                </span>
                <span className="block truncate text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 rounded-full border border-border/50 bg-muted/30 p-1 lg:flex">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="store-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm ring-1 ring-border/50"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    productsActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => setProductsOpen((v) => !v)}
                  aria-expanded={productsOpen}
                >
                  {productsActive ? (
                    <motion.span
                      layoutId="store-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm ring-1 ring-border/50"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                  Products
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform",
                      productsOpen && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {productsOpen ? (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease }}
                      className="absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,20rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-2xl backdrop-blur-xl"
                    >
                      <Link
                        href="/products"
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted/60"
                      >
                        All products
                        <ArrowRight className="size-3.5" />
                      </Link>
                      <div className="my-1 h-px bg-border/60" />
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products/${cat.slug}`}
                          className="block rounded-xl px-4 py-2.5 text-sm hover:bg-muted/60"
                        >
                          <span className="font-medium">{cat.title}</span>
                        </Link>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-2 lg:flex">
              <Button asChild size="sm" variant="ghost" className="rounded-full">
                <a href={whatsappHref()} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="sm" className="rounded-full px-5 shadow-lg shadow-primary/15">
                <Link href="/contact#quote">
                  Get quote
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-xl lg:hidden",
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </Container>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute inset-x-3 top-[4.25rem] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-border/60 bg-card/95 p-5 shadow-2xl backdrop-blur-xl"
              initial={reduce ? false : { opacity: 0, y: -12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease }}
            >
              <div className="mb-5 flex items-center gap-3 border-b border-border/50 pb-5">
                <BrandLogo framed className="h-10 w-10" />
                <div>
                  <p className="text-sm font-bold">{siteConfig.name}</p>
                  <p className="text-[10px] text-muted-foreground">{siteConfig.tagline}</p>
                </div>
              </div>

              <Link
                href="/"
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium",
                  pathname === "/" ? "bg-primary/10" : "hover:bg-muted/50",
                )}
              >
                Home
              </Link>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mt-1 block rounded-xl px-4 py-3 text-base font-medium",
                    isActive(pathname, item.href) ? "bg-primary/10" : "hover:bg-muted/50",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <p className="mb-2 mt-4 px-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Products
              </p>
              <Link href="/products" className="block rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-muted/50">
                All products
              </Link>
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="block rounded-xl px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  {cat.title}
                </Link>
              ))}

              <div className="mt-5 grid gap-2 border-t border-border/50 pt-5">
                <Button asChild className="h-11 w-full rounded-xl">
                  <Link href="/contact#quote">Get quote</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 w-full rounded-xl">
                  <a href={whatsappHref()} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
