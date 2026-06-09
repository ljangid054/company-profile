import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-[3.75rem] sm:pt-16 lg:pt-[4.25rem]">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
