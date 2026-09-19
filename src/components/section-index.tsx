"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export function SectionIndex() {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(true);

  const onHome = pathname === "/";

  React.useEffect(() => {
    if (!onHome) return;

    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActive(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [onHome]);

  React.useEffect(() => {
    if (!onHome) return;

    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      setVisible(!nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  if (!onHome) return null;

  const activeIdx = SECTIONS.findIndex((s) => s.id === active);
  const next =
    activeIdx >= 0 && activeIdx < SECTIONS.length - 1
      ? SECTIONS[activeIdx + 1]
      : SECTIONS[0];

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/85 backdrop-blur-xl transition-all duration-300 no-print",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] sm:gap-x-5">
          {SECTIONS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={`#${next.id}`}
          className="hidden items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          aria-label={`Continue to ${next.label}`}
        >
          Continue
          <ArrowDown className="size-3" />
        </a>
      </div>
    </nav>
  );
}
