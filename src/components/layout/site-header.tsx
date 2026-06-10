"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Search, User } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; hasMenu?: boolean };

const leftNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Shop Now", hasMenu: true },
  { href: "/contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col justify-center gap-1.5" aria-hidden>
      <span
        className={cn(
          "block h-px w-full bg-foreground transition-all duration-500 ease-in-out",
          open && "translate-y-[3.5px] rotate-45",
        )}
      />
      <span
        className={cn(
          "block h-px w-full bg-foreground transition-all duration-500 ease-in-out",
          open && "-translate-y-[3.5px] -rotate-45",
        )}
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="bg-background pt-5 lg:pt-8">
        <Container>
          {/* Desktop */}
          <div className="hidden items-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            <nav className="flex items-center gap-7 xl:gap-8">
              {leftNav.map((item) =>
                item.hasMenu ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <Link
                      href={item.href}
                      data-active={isActive(pathname, item.href)}
                      className="drinkify-nav-link inline-flex items-center gap-1"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-500 ease-in-out",
                          shopOpen && "rotate-180",
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {shopOpen ? (
                        <motion.div
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={reduce ? undefined : { opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, ease }}
                          className="absolute left-0 top-full z-50 mt-3 min-w-[220px] border border-border bg-card py-2 shadow-lg"
                        >
                          <Link
                            href="/products"
                            className="block px-4 py-2.5 text-base text-foreground transition-colors duration-500 hover:bg-secondary hover:text-[var(--drinkify-orange)]"
                          >
                            All products
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/products/${cat.slug}`}
                              className="block px-4 py-2.5 text-base text-muted-foreground transition-colors duration-500 hover:bg-secondary hover:text-[var(--drinkify-orange)]"
                            >
                              {cat.title}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-active={isActive(pathname, item.href)}
                    className="drinkify-nav-link"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <Link href="/" className="text-center transition-opacity duration-500 hover:opacity-80">
              <span className="font-heading text-[28px] font-bold leading-tight text-foreground">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-[13px] text-[#333333]">
                Handcrafted Brass Hookahs
              </span>
            </Link>

            <div className="flex items-center justify-end gap-5">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className="drinkify-icon-btn"
                aria-label="Search"
              >
                <Search className="size-5 stroke-[1.5]" />
              </button>
              <Link href="/contact" className="drinkify-icon-btn" aria-label="Contact">
                <User className="size-5 stroke-[1.5]" />
              </Link>
            </div>
          </div>

          {/* Mobile — Drinkify: menu | logo | icons */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 lg:hidden">
            <button
              type="button"
              className="p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>

            <Link href="/" className="text-center">
              <span className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-[11px] text-[#333333] sm:text-[13px]">
                Handcrafted Brass Hookahs
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className="drinkify-icon-btn"
                aria-label="Search"
              >
                <Search className="size-5 stroke-[1.5]" />
              </button>
              <Link href="/contact" className="drinkify-icon-btn" aria-label="Contact">
                <User className="size-5 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </Container>

        <AnimatePresence>
          {searchOpen ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={reduce ? undefined : { opacity: 1, height: "auto" }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden border-t border-border"
            >
              <Container className="py-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products…"
                    className="h-11 flex-1 border-border bg-card"
                    autoFocus
                  />
                  <Button type="submit" className="h-11 px-6">
                    Search
                  </Button>
                </form>
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/20"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute left-0 top-0 h-full w-[min(88vw,320px)] overflow-y-auto bg-background p-6 shadow-xl"
              initial={reduce ? false : { x: "-100%" }}
              animate={reduce ? undefined : { x: 0 }}
              exit={reduce ? undefined : { x: "-100%" }}
              transition={{ duration: 0.45, ease }}
            >
              <p className="font-heading text-2xl font-bold">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">Handcrafted Brass Hookahs</p>
              <ul className="mt-8 space-y-1">
                {leftNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "drinkify-mobile-nav-link block py-3 text-lg",
                        isActive(pathname, item.href) && "is-active",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                <ul className="mt-3 space-y-1">
                  {categories.slice(0, 5).map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/products/${cat.slug}`}
                        className="block py-2 text-base text-muted-foreground transition-colors duration-500 hover:text-[var(--drinkify-orange)]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
