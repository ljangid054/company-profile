"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/whatsapp";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-4"
        >
          <BrandLogo className="h-9 w-[6.75rem] shrink-0 sm:h-10 sm:w-[8.25rem]" priority />
          <div className="min-w-0 flex flex-col leading-tight">
            <span className="truncate font-heading text-base tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
              {siteConfig.name}
            </span>
            <span className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex"
          >
            <a href={whatsappHref()} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact#quote">Request quote</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "lg:hidden",
                }),
              )}
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-sm">
              <SheetHeader className="space-y-4 text-left">
                <BrandLogo className="h-10 w-36" />
                <SheetTitle className="font-heading">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                      pathname === item.href && "bg-muted text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  <Button asChild>
                    <a href={whatsappHref()} target="_blank" rel="noreferrer">
                      WhatsApp inquiry
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact#quote">Request quote</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
