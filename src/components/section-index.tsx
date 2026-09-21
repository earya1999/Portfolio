"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "overview", label: "Overview", n: "01" },
  { id: "experience", label: "Experience", n: "02" },
  { id: "education", label: "Education", n: "03" },
  { id: "skills", label: "Skills", n: "04" },
  { id: "tools", label: "Tools", n: "05" },
  { id: "projects", label: "Projects", n: "06" },
  { id: "certifications", label: "Certs", n: "07" },
  { id: "contact", label: "Contact", n: "08" },
] as const;

const LAST_ID = SECTIONS[SECTIONS.length - 1].id;

export function SectionIndex() {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>("overview");
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
        rootMargin: "-25% 0px -45% 0px",
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
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.5
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

  return createPortal(
    <nav
      aria-label="Page sections"
      aria-hidden={hide}
      className={cn(
        "fixed left-0 top-1/2 z-[60] hidden -translate-y-1/2 flex-col no-print lg:flex",
        "transition-opacity duration-300",
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <ul className="ml-3 flex flex-col gap-1 border-l border-border/70 pl-3 xl:ml-5">
        {SECTIONS.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                tabIndex={hide ? -1 : undefined}
                title={item.label}
                aria-label={`${item.n} ${item.label}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group flex items-center gap-2.5 py-1.5 font-mono text-[11px] tracking-wide transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/70 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-6 items-center justify-center border text-[10px] font-medium transition-colors",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-transparent text-muted-foreground/60 group-hover:border-border group-hover:text-foreground"
                  )}
                >
                  {item.n}
                </span>
                <span
                  className={cn(
                    "max-w-0 overflow-hidden uppercase tracking-[0.16em] opacity-0 transition-all duration-200",
                    "group-hover:max-w-[7rem] group-hover:opacity-100",
                    isActive && "max-w-[7rem] opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>,
    document.body
  );
}
