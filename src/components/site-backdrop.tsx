"use client";

/** Quiet page atmosphere — canvas, faint grain, no motion chrome. */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="site-atmosphere absolute inset-0" />
      <div className="site-horizon absolute inset-x-0 top-0 h-[42vh]" />
      <div className="site-grain absolute inset-0 opacity-[0.035] dark:opacity-[0.045]" />
      <div className="site-vignette absolute inset-0" />
    </div>
  );
}
