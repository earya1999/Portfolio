"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => !/^(of|the|and|&)$/i.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Company / school mark with light plate so logos stay readable in dark mode. */
export function OrgLogo({
  src,
  alt,
  className,
  size = 64,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  size?: number;
}) {
  const [failed, setFailed] = React.useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_8px_24px_-12px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          width={size * 2}
          height={size * 2}
          quality={95}
          className="object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-display text-sm font-semibold tracking-wide text-neutral-700">
          {initialsFrom(alt)}
        </span>
      )}
    </div>
  );
}
