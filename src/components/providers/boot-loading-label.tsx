export function BootLoadingLabel() {
  return (
    <p className="animate-boot-loading-text m-0 flex shrink-0 items-baseline justify-center text-white/95">
      <span className="text-sm font-medium uppercase tracking-[0.35em] pl-[0.35em]">
        Loading
      </span>
      <span
        className="ml-1 inline-flex w-5 items-end justify-start text-base leading-none"
        aria-hidden
      >
        <span className="animate-boot-loading-dot">.</span>
        <span className="animate-boot-loading-dot animate-boot-loading-dot-2">.</span>
        <span className="animate-boot-loading-dot animate-boot-loading-dot-3">.</span>
      </span>
    </p>
  );
}
