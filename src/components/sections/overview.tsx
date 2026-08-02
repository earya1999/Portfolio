"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/tilt-card";
import { overview } from "@/lib/content";

export function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="Overview"
      title="Bridging business and technology."
      accent="violet"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <TiltCard maxTilt={5} className="rounded-2xl">
        <div className="depth-card rounded-2xl border border-border/60 bg-card/60 p-6 sm:p-10">
          <div className="flex flex-col gap-5">
            {overview.intro.map((p, i) => (
              <p
                key={i}
                className="text-base text-foreground/90 leading-relaxed text-pretty sm:text-[17px]"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="eyebrow">My core strengths</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {overview.capabilities.map((c, i) => {
                const palette = [
                  {
                    bg: "bg-sky-500/15",
                    text: "text-sky-500 dark:text-sky-400",
                    ring: "ring-sky-500/30",
                  },
                  {
                    bg: "bg-violet-500/15",
                    text: "text-violet-500 dark:text-violet-400",
                    ring: "ring-violet-500/30",
                  },
                  {
                    bg: "bg-amber-500/15",
                    text: "text-amber-500 dark:text-amber-400",
                    ring: "ring-amber-500/30",
                  },
                  {
                    bg: "bg-emerald-500/15",
                    text: "text-emerald-500 dark:text-emerald-400",
                    ring: "ring-emerald-500/30",
                  },
                ][i % 4];
                return (
                  <li
                    key={c.title}
                    className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/50 px-4 py-3"
                  >
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${palette.bg} ${palette.text} ring-1 ${palette.ring}`}
                    >
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm text-foreground/90 text-pretty">
                      {c.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="eyebrow">Actively seeking full-time opportunities in</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {overview.seeking.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm text-foreground/90"
                >
                  <span className="size-1 rounded-full bg-foreground/60" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {overview.cta && (
            <div className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground/85 text-pretty sm:text-base">
                {overview.cta}
              </p>
              <Button asChild className="shrink-0">
                <a href="#contact">
                  Get in touch
                  <ArrowRight />
                </a>
              </Button>
            </div>
          )}
        </div>
        </TiltCard>
      </motion.div>
    </Section>
  );
}
