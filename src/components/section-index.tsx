"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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

const LAST_ID = SECTIONS[SECTIONS.length - 1].id;

export function SectionIndex() {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [atEnd, setAtEnd] = React.useState(false);

  const onHome = pathname === "/";

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

    const update = () => {
      const contact = document.getElementById(LAST_ID);
      const contactInView = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.55
        : false;
      const nearDocEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      setAtEnd(contactInView || nearDocEnd);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome]);

  if (!onHome || !mounted) return null;

  const hide = atEnd || active === LAST_ID;
  const activeIdx = SECTIONS.findIndex((s) => s.id === active);
  const next =
    activeIdx >= 0 && activeIdx < SECTIONS.length - 1
      ? SECTIONS[activeIdx + 1]
      : SECTIONS[0];

  return createPortal(
    <nav
      aria-label="Page sections"
      aria-hidden={hide}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] border-t border-border/80 bg-background/90 backdrop-blur-xl transition-all duration-300 no-print",
        hide
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
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
                  tabIndex={hide ? -1 : undefined}
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
          tabIndex={hide ? -1 : undefined}
          className="hidden items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          aria-label={`Continue to ${next.label}`}
        >
          Continue
          <ArrowDown className="size-3" />
        </a>
      </div>
    </nav>,
    document.body
  );
}
