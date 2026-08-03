"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/spotlight";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/content";

const PREVIEW_COUNT = 4;

export function Experience() {
  const [open, setOpen] = React.useState<string | null>(experience[0]?.id ?? null);
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
        <div className="absolute bottom-0 left-4 top-2 hidden w-px bg-gradient-to-b from-border via-border to-transparent sm:block" />
        <div className="flex flex-col gap-4">
          {experience.map((entry, i) => {
            const isOpen = open === entry.id;
            const showAll = !!expanded[entry.id];
            const preview = entry.highlights.slice(0, PREVIEW_COUNT);
            const rest = entry.highlights.slice(PREVIEW_COUNT);
            const visible = showAll ? entry.highlights : preview;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative sm:pl-14"
              >
                <div className="absolute left-0 top-4 hidden size-9 items-center justify-center rounded-full border border-border bg-background sm:flex">
                  <Briefcase className="size-4 text-foreground/70" />
                </div>

                <Spotlight className="rounded-2xl">
                  <div
                    className={cn(
                      "rounded-2xl border border-border/60 bg-card/60 transition-all",
                      "hover:border-foreground/20 hover:bg-card",
                      isOpen && "border-foreground/20"
                    )}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : entry.id)}
                      className="group flex w-full flex-col p-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`exp-panel-${entry.id}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              {entry.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {entry.start} — {entry.end}
                            </span>
                          </div>
                          <h3 className="mt-2 font-display text-lg font-semibold tracking-tight sm:text-xl">
                            {entry.role}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {entry.company} · {entry.location}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>

                      <p className="mt-3 text-sm text-foreground/80 text-pretty">
                        {entry.summary}
                      </p>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`exp-panel-${entry.id}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-6 border-t border-border/60 px-5 pb-5 pt-5 lg:grid-cols-5">
                            <div className="lg:col-span-3">
                              <div className="eyebrow mb-2">Highlights</div>
                              <ul className="space-y-2 text-sm text-foreground/85">
                                {visible.map((h) => (
                                  <li key={h} className="flex items-start gap-2">
                                    <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/60" />
                                    <span className="text-pretty">{h}</span>
                                  </li>
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
                                  className="mt-3 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                                >
                                  {showAll
                                    ? "Show less"
                                    : `Show ${rest.length} more`}
                                </button>
                              )}
                            </div>
                            {entry.technologies.length > 0 && (
                              <div className="lg:col-span-2">
                                <div className="eyebrow mb-2">Skills used</div>
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
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
