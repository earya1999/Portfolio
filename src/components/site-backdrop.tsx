/** Fixed ambient page atmosphere — soft washes, grain, and a quiet grid. */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base depth gradient */}
      <div className="absolute inset-0 bg-background" />
      <div className="site-atmosphere absolute inset-0" />

      {/* Soft ambient orbs — steel / teal / warm slate, never neon */}
      <div className="absolute -left-[18%] top-[-8%] h-[58vmin] w-[58vmin] rounded-full bg-[radial-gradient(closest-side,rgba(125,148,178,0.22),transparent_72%)] blur-3xl ambient-drift-a dark:bg-[radial-gradient(closest-side,rgba(96,125,158,0.28),transparent_72%)]" />
      <div className="absolute -right-[12%] top-[18%] h-[48vmin] w-[48vmin] rounded-full bg-[radial-gradient(closest-side,rgba(94,140,140,0.16),transparent_72%)] blur-3xl ambient-drift-b dark:bg-[radial-gradient(closest-side,rgba(56,120,130,0.22),transparent_72%)]" />
      <div className="absolute bottom-[-10%] left-[22%] h-[52vmin] w-[52vmin] rounded-full bg-[radial-gradient(closest-side,rgba(148,140,128,0.14),transparent_72%)] blur-3xl ambient-drift-c dark:bg-[radial-gradient(closest-side,rgba(110,120,140,0.18),transparent_72%)]" />

      {/* Fine editorial grid */}
      <div className="site-grid absolute inset-0 opacity-[0.35] dark:opacity-[0.28]" />

      {/* Film grain */}
      <div className="site-grain absolute inset-0 opacity-[0.045] dark:opacity-[0.055]" />

      {/* Soft vignette so edges fall away */}
      <div className="site-vignette absolute inset-0" />
    </div>
  );
}
