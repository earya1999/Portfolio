import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  /** Optional section number shown before the eyebrow, e.g. "01" */
  index?: string;
  title?: string;
  description?: string;
  center?: boolean;
}

export function Section({
  id,
  eyebrow,
  index,
  title,
  description,
  center = false,
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
      <div className="container relative">
        {(eyebrow || title || description) && (
          <Reveal
            className={cn(
              "mb-14 max-w-2xl sm:mb-16",
              center && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <div className="eyebrow mb-4">
                {index && (
                  <span className="mr-2 text-foreground/40">{index}</span>
                )}
                {eyebrow}
              </div>
            )}
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
