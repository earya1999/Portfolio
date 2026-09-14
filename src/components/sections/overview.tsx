"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/tilt-card";
import { Spotlight } from "@/components/spotlight";
import { Magnetic } from "@/components/magnetic";
import { overview } from "@/lib/content";

export function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="Overview"
      title="How I run delivery."
      accent="violet"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <TiltCard maxTilt={5} className="rounded-3xl">
        <Spotlight className="aurora-border depth-card rounded-3xl border border-border/50 bg-card/60">
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            {overview.intro.map((p, i) => (
              <p
                key={i}
                className="text-base text-foreground/90 leading-relaxed text-pretty sm:text-[17px]"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <h3 className="eyebrow">Core strengths</h3>
              <ul className="mt-4 grid gap-2">
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
                      className="flex items-start gap-3 rounded-2xl border border-border/35 bg-background/50 px-4 py-3"
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

            <div>
              <h3 className="eyebrow">Target roles</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {overview.seeking.map((s, i) => (
                  <li
                    key={s}
                    className={
                      i === 0
                        ? "rounded-full border border-sky-400/35 bg-sky-400/10 px-3 py-1.5 text-sm text-foreground"
                        : "rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-sm text-foreground/85"
                    }
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {overview.cta && (
            <div className="flex flex-col gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-12">
              <p className="text-sm text-foreground/85 text-pretty sm:text-base">
                {overview.cta}
              </p>
              <Magnetic className="shrink-0">
                <Button asChild>
                  <a href="#contact">
                    Get in touch
                    <ArrowRight />
                  </a>
                </Button>
              </Magnetic>
            </div>
          )}
        </div>
        </Spotlight>
        </TiltCard>
      </motion.div>
    </Section>
  );
}
