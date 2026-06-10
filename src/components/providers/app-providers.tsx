"use client";

import type { ReactNode } from "react";
import { AppBootLoader } from "@/components/providers/app-boot-loader";
import { LoadingProvider } from "@/components/providers/loading-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <div data-app-shell className="flex min-h-full flex-1 flex-col">
        {children}
      </div>
      <AppBootLoader />
    </LoadingProvider>
  );
}
