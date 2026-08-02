import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionAccent =
  | "none"
  | "blue"
  | "emerald"
  | "violet"
  | "amber"
  | "rose";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  center?: boolean;
  accent?: SectionAccent;
}

const accentClass: Record<SectionAccent, string> = {
  none: "",
  blue: "bg-[radial-gradient(closest-side,rgba(59,130,246,0.42),transparent_68%)]",
  emerald:
    "bg-[radial-gradient(closest-side,rgba(16,185,129,0.40),transparent_68%)]",
  violet:
    "bg-[radial-gradient(closest-side,rgba(139,92,246,0.42),transparent_68%)]",
  amber:
    "bg-[radial-gradient(closest-side,rgba(245,158,11,0.38),transparent_68%)]",
  rose: "bg-[radial-gradient(closest-side,rgba(244,63,94,0.38),transparent_68%)]",
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  center = false,
  accent = "none",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden scroll-mt-24 py-20 sm:py-28",
        className
      )}
      {...props}
    >
      {accent !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            // Soft vertical dissolve so accents don't create hard section bands
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        >
          <div
            className={cn(
              "absolute top-[14%] -left-32 h-[620px] w-[620px] rounded-full blur-3xl",
              accentClass[accent]
            )}
          />
          <div
            className={cn(
              "absolute bottom-[10%] -right-32 h-[540px] w-[540px] rounded-full blur-3xl opacity-90",
              accentClass[accent]
            )}
          />
        </div>
      )}

      <div className="container relative">
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-12 max-w-2xl sm:mb-16",
              center && "mx-auto text-center"
            )}
          >
            {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
            {title && (
              <h2 className="heading text-3xl font-semibold sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-muted-foreground sm:text-lg text-pretty">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
