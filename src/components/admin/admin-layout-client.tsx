"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/categories": "Categories",
  "/admin/contacts": "Inquiries",
  "/admin/users": "Users",
};

function titleForPath(pathname: string) {
  if (pathname.startsWith("/admin/products/new")) return "New product";
  if (pathname.match(/^\/admin\/products\/[^/]+$/)) return "Edit product";
  return TITLES[pathname] ?? "Admin";
}

type AdminLayoutClientProps = {
  children: React.ReactNode;
  email?: string | null;
  role: string;
};

export function AdminLayoutClient({ children, email, role }: AdminLayoutClientProps) {
  const pathname = usePathname();
  return (
    <AdminShell title={titleForPath(pathname)} email={email} role={role}>
      {children}
    </AdminShell>
  );
}
