import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

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

/** Soft section washes — enough chroma to feel alive */
const accentClass: Record<SectionAccent, string> = {
  none: "",
  blue: "bg-[radial-gradient(closest-side,rgba(90,150,210,0.36),transparent_70%)]",
  emerald:
    "bg-[radial-gradient(closest-side,rgba(50,160,145,0.3),transparent_70%)]",
  violet:
    "bg-[radial-gradient(closest-side,rgba(120,140,190,0.28),transparent_70%)]",
  amber:
    "bg-[radial-gradient(closest-side,rgba(190,145,85,0.26),transparent_70%)]",
  rose: "bg-[radial-gradient(closest-side,rgba(170,120,130,0.22),transparent_70%)]",
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
        "relative overflow-hidden scroll-mt-24 py-24 sm:py-28 md:py-32",
        className
      )}
      {...props}
    >
      {accent !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          }}
        >
          <div
            className={cn(
              "absolute top-[18%] -left-40 h-[520px] w-[520px] rounded-full blur-3xl",
              accentClass[accent]
            )}
          />
          <div
            className={cn(
              "absolute bottom-[12%] -right-40 h-[460px] w-[460px] rounded-full blur-3xl opacity-80",
              accentClass[accent]
            )}
          />
        </div>
      )}

      <div className="container relative">
        {(eyebrow || title || description) && (
          <Reveal
            className={cn(
              "mb-14 max-w-2xl sm:mb-16",
              center && "mx-auto text-center"
            )}
          >
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            {title && (
              <h2 className="heading text-3xl sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg text-pretty">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
