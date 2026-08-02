"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal marquee — pauses on hover, respects reduced motion. */
export function Marquee({
  children,
  className,
  speed = 40,
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop */
  speed?: number;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 gap-3">{children}</div>
        <div className="flex shrink-0 gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
