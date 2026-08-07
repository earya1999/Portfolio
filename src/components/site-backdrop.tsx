"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

/** Fixed ambient page atmosphere — richer light, texture, and quiet motion. */
export function SiteBackdrop() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22, mass: 0.8 });
  const spotlight = useMotionTemplate`radial-gradient(680px circle at calc(${springX} * 100%) calc(${springY} * 100%), rgba(186, 205, 230, 0.14), transparent 55%)`;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMove = (e: MouseEvent) => {
      if (mq.matches) return;
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="site-atmosphere absolute inset-0" />

      {/* Primary light orbs */}
      <div className="ambient-orb ambient-orb-a ambient-drift-a" />
      <div className="ambient-orb ambient-orb-b ambient-drift-b" />
      <div className="ambient-orb ambient-orb-c ambient-drift-c" />
      <div className="ambient-orb ambient-orb-d ambient-drift-a" />

      {/* Soft diagonal light beam */}
      <div className="site-beam absolute inset-0" />

      {/* Horizon glow */}
      <div className="site-horizon absolute inset-x-0 top-0 h-[55vh]" />

      {/* Mouse spotlight — calm, local lift */}
      <motion.div className="absolute inset-0 opacity-90 dark:opacity-100" style={{ background: spotlight }} />

      {/* Dot field + architectural grid */}
      <div className="site-dots absolute inset-0 opacity-[0.55] dark:opacity-[0.45]" />
      <div className="site-grid absolute inset-0 opacity-[0.45] dark:opacity-[0.38]" />

      {/* Film grain */}
      <div className="site-grain absolute inset-0 opacity-[0.06] dark:opacity-[0.07]" />

      <div className="site-vignette absolute inset-0" />
    </div>
  );
}
