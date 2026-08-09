"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  CalendarDays,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/spotlight";
import { TiltCard } from "@/components/tilt-card";
import { OrgLogo } from "@/components/org-logo";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/content";

const PREVIEW_COUNT = 4;

const typeStyle: Record<
  string,
  { badge: "success" | "info" | "default" | "outline"; node: string }
> = {
  "Full-time": {
    badge: "success",
    node: "from-emerald-400 to-teal-500 shadow-emerald-500/30",
  },
  Practicum: {
    badge: "info",
    node: "from-sky-400 to-blue-500 shadow-sky-500/30",
  },
  Internship: {
    badge: "default",
    node: "from-amber-400 to-orange-500 shadow-amber-500/25",
  },
};

export function Experience() {
  const [open, setOpen] = React.useState<string | null>(
    experience[0]?.id ?? null
  );
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Enterprise implementations and applied analytics."
      description="Enterprise SaaS delivery at HighRadius, with a banking analytics practicum at Community First Bank of Indiana."
      accent="emerald"
    >
      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute bottom-8 left-[1.125rem] top-8 hidden w-px bg-gradient-to-b from-emerald-400/50 via-border to-transparent sm:block"
        />

        <div className="flex flex-col gap-5">
          {experience.map((entry, i) => {
            const isOpen = open === entry.id;
            const showAll = !!expanded[entry.id];
            const rest = entry.highlights.slice(PREVIEW_COUNT);
            const visible = showAll
              ? entry.highlights
              : entry.highlights.slice(0, PREVIEW_COUNT);
            const style = typeStyle[entry.type] ?? {
              badge: "outline" as const,
              node: "from-foreground/40 to-foreground/20 shadow-foreground/10",
            };
            const teaser = entry.highlights.slice(0, 2);

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative sm:pl-14"
              >
                {/* Timeline node */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-8 hidden size-9 items-center justify-center rounded-full border border-border/80 bg-background sm:flex",
                    isOpen && "ring-2 ring-emerald-400/20"
                  )}
                >
                  <span
                    className={cn(
                      "size-2.5 rounded-full bg-gradient-to-br shadow-md",
                      style.node
                    )}
                  />
                </div>

                <TiltCard maxTilt={4} className="rounded-2xl">
                  <Spotlight className="rounded-2xl">
                    <article
                      className={cn(
                        "depth-card overflow-hidden rounded-2xl border bg-card/70 transition-all duration-300",
                        isOpen
                          ? "border-emerald-500/25 bg-card shadow-[0_0_0_1px_rgba(16,185,129,0.08)]"
                          : "border-border/60 hover:border-foreground/15 hover:bg-card"
                      )}
                    >
                      {/* Top accent line */}
                      <div
                        aria-hidden
                        className={cn(
                          "h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent transition-opacity",
                          isOpen ? "opacity-100" : "opacity-40"
                        )}
                      />

                      <button
                        onClick={() => setOpen(isOpen ? null : entry.id)}
                        className="group flex w-full flex-col p-5 text-left sm:p-6"
                        aria-expanded={isOpen}
                        aria-controls={`exp-panel-${entry.id}`}
                      >
                        <div className="flex items-start gap-4">
                          <div style={{ transform: "translateZ(12px)" }}>
                            <OrgLogo
                              src={entry.logo}
                              alt={entry.company}
                              size={48}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant={style.badge}
                                className="text-[10px]"
                              >
                                {entry.type}
                              </Badge>
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarDays className="size-3" />
                                {entry.start} — {entry.end}
                              </span>
                            </div>

                            <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-balance sm:text-xl">
                              {entry.company}
                            </h3>

                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5 text-foreground/85">
                                <Building2 className="size-3.5" />
                                {entry.role}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="size-3.5" />
                                {entry.location}
                              </span>
                            </div>
                          </div>

                          <span
                            className={cn(
                              "mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-all",
                              "group-hover:border-foreground/20 group-hover:text-foreground",
                              isOpen && "rotate-180 border-emerald-500/30 text-emerald-400"
                            )}
                          >
                            <ChevronDown className="size-4" />
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-foreground/80 text-pretty">
                          {entry.summary}
                        </p>

                        {/* Collapsed teaser highlights */}
                        {!isOpen && teaser.length > 0 && (
                          <ul className="mt-4 space-y-2 border-t border-border/50 pt-4">
                            {teaser.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                              >
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald-400/70" />
                                <span className="line-clamp-2 text-pretty">
                                  {h}
                                </span>
                              </li>
                            ))}
                            {entry.highlights.length > 2 && (
                              <li className="pt-1 text-xs font-medium text-foreground/70">
                                View {entry.highlights.length - 2} more
                                highlights
                                <ArrowUpRight className="ml-0.5 inline size-3 opacity-60" />
                              </li>
                            )}
                          </ul>
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`exp-panel-${entry.id}`}
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-6 border-t border-border/60 bg-background/30 px-5 py-6 sm:px-6 lg:grid-cols-5">
                              <div className="lg:col-span-3">
                                <div className="eyebrow mb-3">Highlights</div>
                                <ul className="space-y-3">
                                  {visible.map((h, hi) => (
                                    <motion.li
                                      key={h}
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: hi * 0.04 }}
                                      className="flex items-start gap-3 text-sm text-foreground/90"
                                    >
                                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10 font-mono text-[10px] text-emerald-500 dark:text-emerald-400">
                                        {String(hi + 1).padStart(2, "0")}
                                      </span>
                                      <span className="leading-relaxed text-pretty">
                                        {h}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                                {rest.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpanded((s) => ({
                                        ...s,
                                        [entry.id]: !showAll,
                                      }))
                                    }
                                    className="mt-4 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                                  >
                                    {showAll
                                      ? "Show less"
                                      : `Show ${rest.length} more`}
                                    <ChevronDown
                                      className={cn(
                                        "size-3.5 transition-transform",
                                        showAll && "rotate-180"
                                      )}
                                    />
                                  </button>
                                )}
                              </div>

                              {entry.technologies.length > 0 && (
                                <div className="lg:col-span-2">
                                  <div className="rounded-xl border border-border/50 bg-card/50 p-4">
                                    <div className="eyebrow mb-3">
                                      Skills used
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {entry.technologies.map((t) => (
                                        <Badge
                                          key={t}
                                          variant="muted"
                                          className="text-[10px]"
                                        >
                                          {t}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  </Spotlight>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
