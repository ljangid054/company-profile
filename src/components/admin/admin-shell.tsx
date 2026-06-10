"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
  email?: string | null;
  role: string;
};

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

export function AdminShell({ children, title, email, role }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-theme flex min-h-screen">
      <div className="hidden lg:flex">
        <AdminSidebar
          role={role}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30 transition-opacity"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full animate-in slide-in-from-left duration-500">
            <AdminSidebar
              role={role}
              collapsed={false}
              onToggleCollapse={() => setMobileOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <div className="admin-main flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            type="button"
            className="p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon open={false} />
          </button>
          <span className="admin-heading text-base font-semibold">Somada Admin</span>
        </div>
        <AdminHeader title={title} email={email} role={role} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
