import "./admin-theme.css";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="admin-theme min-h-screen antialiased">{children}</div>;
}
