"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
  email?: string | null;
  role: string;
};

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
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <AdminSidebar
            role={role}
            collapsed={false}
            onToggleCollapse={() => setMobileOpen(false)}
          />
        </div>
      ) : null}

      <div className="admin-main flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <span className="text-sm font-semibold">Somada Admin</span>
        </div>
        <AdminHeader title={title} email={email} role={role} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
