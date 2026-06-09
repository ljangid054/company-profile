"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  FolderTree,
  LayoutDashboard,
  Mail,
  Package,
  Users,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { SITE_LOGO_IMAGE } from "@/config/visual";

const mainNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/contacts", label: "Inquiries", icon: Mail },
] as const;

type AdminSidebarProps = {
  role: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function AdminSidebar({ role, collapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside
      className={cn(
        "admin-sidebar relative flex h-full flex-col border-r border-white/5 transition-[width] duration-300",
        collapsed ? "w-[4.75rem]" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center gap-3 border-b border-white/10",
          collapsed ? "justify-center px-2" : "px-4",
        )}
      >
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-white p-1">
          <Image
            src={SITE_LOGO_IMAGE}
            alt={siteConfig.name}
            fill
            className="object-contain p-0.5"
            sizes="36px"
          />
        </span>
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">Somada</p>
            <p className="text-[10px] uppercase tracking-widest text-white/45">Admin panel</p>
          </div>
        ) : null}
      </div>

      {!collapsed ? (
        <p className="px-4 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-widest text-white/35">
          Main menu
        </p>
      ) : null}

      <nav className="flex-1 space-y-1 px-2">
        {mainNav.map((item) => {
          const active = isActive(item.href, "exact" in item ? item.exact : false);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-[var(--admin-sidebar-active)] text-white shadow-lg shadow-indigo-900/30"
                  : "text-white/65 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon className="size-[1.125rem] shrink-0" />
              {!collapsed ? item.label : null}
            </Link>
          );
        })}

        {role === "super_admin" ? (
          <>
            {!collapsed ? (
              <p className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-widest text-white/35">
                System
              </p>
            ) : null}
            <Link
              href="/admin/users"
              title={collapsed ? "Users" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive("/admin/users")
                  ? "bg-[var(--admin-sidebar-active)] text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2",
              )}
            >
              <Users className="size-[1.125rem] shrink-0" />
              {!collapsed ? "Users" : null}
            </Link>
          </>
        ) : null}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-2">
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/10 hover:text-white",
            collapsed && "justify-center",
          )}
        >
          <ExternalLink className="size-4 shrink-0" />
          {!collapsed ? "View store" : null}
        </Link>
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-white/45 transition-colors hover:bg-white/10 hover:text-white lg:flex",
            collapsed && "justify-center",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              Collapse
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
