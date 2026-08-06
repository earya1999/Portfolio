"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max tilt in degrees. Keep low for a premium feel. */
  maxTilt?: number;
  /** Perspective distance in px */
  perspective?: number;
  /** Scale on hover */
  hoverScale?: number;
  children: React.ReactNode;
}

export function TiltCard({
  children,
  className,
  maxTilt = 4,
  perspective = 1200,
  hoverScale = 1.008,
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springX = useSpring(rotateX, { stiffness: 220, damping: 22, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.6 });
  const springScale = useSpring(scale, { stiffness: 260, damping: 24 });

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const springGlare = useSpring(glareOpacity, { stiffness: 200, damping: 28 });

  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}% ${glareY}%,
      rgba(255, 255, 255, 0.16),
      transparent 55%
    )
  `;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const onEnter = () => {
    if (reduced) return;
    scale.set(hoverScale);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glareOpacity.set(0);
  };

  return (
    <div
      className={cn("relative [perspective:var(--tilt-perspective)]", className)}
      style={{ ["--tilt-perspective" as string]: `${perspective}px` }}
      {...props}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full overflow-hidden rounded-[inherit] will-change-transform"
      >
        {children}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
            style={{
              background: glareBackground,
              opacity: springGlare,
              transform: "translateZ(1px)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
