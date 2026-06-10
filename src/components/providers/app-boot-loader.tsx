"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { BootLoadingLabel } from "@/components/providers/boot-loading-label";
import { useLoading } from "@/components/providers/loading-provider";
import { cn } from "@/lib/utils";

const EXIT_MS = 550;
const EXIT_BUFFER_MS = 50;

function clearBootLoadingClass() {
  document.documentElement.classList.remove("boot-loading");
}

export function AppBootLoader() {
  const { isBooting, pendingApiCalls } = useLoading();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [lottieReady, setLottieReady] = useState(false);

  useLayoutEffect(() => {
    document.getElementById("boot-splash")?.remove();
  }, []);

  useEffect(() => {
    if (isBooting) return;

    setExiting(true);
    clearBootLoadingClass();

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, EXIT_MS + EXIT_BUFFER_MS);

    return () => window.clearTimeout(hideTimer);
  }, [isBooting]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "boot-loader-overlay fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0a]",
        exiting && "boot-loader-overlay--exit",
      )}
      role="status"
      aria-live="polite"
      aria-busy={pendingApiCalls > 0}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center sm:h-40 sm:w-40">
          {!lottieReady ? (
            <div
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <div className="size-[4.5rem] rounded-full border border-[#847630]/35 sm:size-24" />
            </div>
          ) : null}
          <DotLottieReact
            src="/loader.lottie"
            loop
            autoplay
            renderConfig={{ autoResize: true }}
            className={cn(
              "mx-auto block h-32 w-32 sm:h-40 sm:w-40",
              !lottieReady && "opacity-0",
            )}
            dotLottieRefCallback={(instance) => {
              if (instance) setLottieReady(true);
            }}
          />
        </div>

        <BootLoadingLabel />
      </div>
    </div>
  );
}
