"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { OrgLogo } from "@/components/org-logo";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/content";

const PREVIEW_COUNT = 4;

export function Experience() {
  const [open, setOpen] = React.useState<string | null>(
    experience[0]?.id ?? null
  );
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      index="02"
      title="Enterprise implementations and applied analytics."
      description="SaaS delivery at HighRadius, plus a banking analytics practicum at Community First Bank of Indiana."
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute bottom-6 left-3 top-6 hidden w-px bg-border sm:block"
        />

        <div className="flex flex-col gap-4">
          {experience.map((entry, i) => {
            const isOpen = open === entry.id;
            const showAll = !!expanded[entry.id];
            const rest = entry.highlights.slice(PREVIEW_COUNT);
            const visible = showAll
              ? entry.highlights
              : entry.highlights.slice(0, PREVIEW_COUNT);
            const teaser = entry.highlights.slice(0, 2);

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative sm:pl-12"
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-7 hidden size-6 items-center justify-center border border-border bg-background sm:flex",
                    isOpen && "border-foreground bg-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5",
                      isOpen ? "bg-background" : "bg-foreground/50"
                    )}
                  />
                </div>

                <article className="overflow-hidden border border-border bg-card">
                  <button
                    onClick={() => setOpen(isOpen ? null : entry.id)}
                    className="group flex w-full flex-col p-5 text-left sm:p-6"
                    aria-expanded={isOpen}
                    aria-controls={`exp-panel-${entry.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <OrgLogo
                        src={entry.logo}
                        alt={entry.company}
                        size={56}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-medium tracking-tight text-balance sm:text-xl">
                          {entry.company}
                        </h3>
                        <p className="mt-1 text-sm text-foreground/80">
                          {entry.role}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {entry.type}
                          <span className="mx-1.5 text-foreground/25">·</span>
                          {entry.location}
                          <span className="mx-1.5 text-foreground/25">·</span>
                          {entry.start} — {entry.end}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180 text-foreground"
                        )}
                      />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-foreground/80 text-pretty">
                      {entry.summary}
                    </p>

                    {!isOpen && teaser.length > 0 && (
                      <ul className="mt-4 space-y-2 border-t border-border pt-4">
                        {teaser.map((h) => (
                          <li
                            key={h}
                            className="text-sm leading-relaxed text-muted-foreground text-pretty"
                          >
                            {h}
                          </li>
                        ))}
                        {entry.highlights.length > 2 && (
                          <li className="pt-1 text-xs font-medium text-foreground/70">
                            View {entry.highlights.length - 2} more highlights
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
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 border-t border-border px-5 py-6 sm:px-6 lg:grid-cols-5">
                          <div className="lg:col-span-3">
                            <div className="eyebrow mb-3">Highlights</div>
                            <ul className="space-y-3">
                              {visible.map((h, hi) => (
                                <li
                                  key={h}
                                  className="flex items-start gap-3 text-sm text-foreground/90"
                                >
                                  <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                                    {String(hi + 1).padStart(2, "0")}
                                  </span>
                                  <span className="leading-relaxed text-pretty">
                                    {h}
                                  </span>
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
                                className="mt-4 text-xs font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
                              >
                                {showAll
                                  ? "Show less"
                                  : `Show ${rest.length} more`}
                              </button>
                            )}
                          </div>

                          {entry.technologies.length > 0 && (
                            <div className="lg:col-span-2">
                              <div className="eyebrow mb-3">Skills used</div>
                              <p className="text-sm leading-relaxed text-foreground/75">
                                {entry.technologies.join(" · ")}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
