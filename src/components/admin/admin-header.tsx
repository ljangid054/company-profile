"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminHeaderProps = {
  title: string;
  email?: string | null;
  role: string;
};

function breadcrumbs(pathname: string) {
  const parts = pathname.replace("/admin", "").split("/").filter(Boolean);
  if (parts.length === 0) return ["Dashboard"];
  return parts.map((p) => p.replace(/-/g, " "));
}

function initials(email?: string | null) {
  if (!email) return "ST";
  return email.slice(0, 2).toUpperCase();
}

export function AdminHeader({ title, email, role }: AdminHeaderProps) {
  const pathname = usePathname();
  const crumbs = breadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {crumbs.join(" / ")}
          </p>
          <h1 className="admin-heading truncate text-xl font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search catalog..."
              className="h-9 w-52 border-border bg-muted/50 pl-9 text-sm"
              readOnly
              aria-label="Search (coming soon)"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-muted-foreground transition-colors duration-500 hover:text-[var(--drinkify-orange)]"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </Button>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex size-9 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">
              {initials(email)}
            </div>
            <div className="hidden text-right xl:block">
              <p className="max-w-[140px] truncate text-xs font-medium text-foreground">
                {email ?? "Staff"}
              </p>
              <p className="text-[10px] capitalize text-muted-foreground">
                {role.replace("_", " ")}
              </p>
            </div>
          </div>

          <form action={signOutAdmin}>
            <Button type="submit" variant="outline" size="sm" className="h-9">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
