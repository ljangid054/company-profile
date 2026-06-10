"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LoadingContextValue = {
  pendingApiCalls: number;
  isBooting: boolean;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

const BOOT_MIN_MS = 600;
const BOOT_IDLE_MS = 200;
const BOOT_MAX_MS = 5000;

function isAppApiRequest(input: RequestInfo | URL): boolean {
  try {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    if (url.startsWith("/api/")) return true;

    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost";
    return new URL(url, origin).pathname.startsWith("/api/");
  } catch {
    return false;
  }
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [pendingApiCalls, setPendingApiCalls] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const pendingRef = useRef(0);

  const adjustPending = useCallback((delta: number) => {
    pendingRef.current = Math.max(0, pendingRef.current + delta);
    setPendingApiCalls(pendingRef.current);
  }, []);

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = function patchedFetch(input, init) {
      if (isAppApiRequest(input)) {
        adjustPending(1);
        return originalFetch(input, init).finally(() => adjustPending(-1));
      }
      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [adjustPending]);

  useEffect(() => {
    let cancelled = false;
    const bootStartedAt = Date.now();
    let idleTimer: number | undefined;

    const tryFinishBoot = () => {
      if (cancelled || pendingRef.current > 0) return;

      const elapsed = Date.now() - bootStartedAt;
      const remainingMin = Math.max(0, BOOT_MIN_MS - elapsed);

      idleTimer = window.setTimeout(() => {
        if (!cancelled && pendingRef.current === 0) {
          setIsBooting(false);
        }
      }, remainingMin + BOOT_IDLE_MS);
    };

    const poll = window.setInterval(tryFinishBoot, 50);
    const maxBoot = window.setTimeout(() => {
      if (!cancelled) setIsBooting(false);
    }, BOOT_MAX_MS);

    tryFinishBoot();

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearTimeout(maxBoot);
      if (idleTimer) window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ pendingApiCalls, isBooting }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return ctx;
}
