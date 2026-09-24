"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { overview } from "@/lib/content";

const PROOF = [
  { value: "42% → 70%", label: "Automation on key workflows" },
  { value: "Red → Green", label: "Cash App recovery in under a month" },
  { value: "Fortune 500", label: "Enterprise SaaS implementations" },
];

export function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="Overview"
      index="01"
      title="From discovery to go-live."
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-10"
      >
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {PROOF.map((stat) => (
            <div key={stat.label} className="bg-card px-5 py-4 sm:px-6 sm:py-5">
              <p className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            {overview.intro.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[15px]"
                    : "text-base leading-relaxed text-foreground/90 text-pretty sm:text-[17px]"
                }
              >
                {p}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-8 border-t border-border pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-10">
            <div>
              <h3 className="eyebrow">Core strengths</h3>
              <ul className="mt-4 space-y-2.5">
                {overview.capabilities.map((c) => (
                  <li
                    key={c.title}
                    className="text-sm leading-relaxed text-foreground/90 text-pretty"
                  >
                    {c.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Target roles</h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                {overview.seeking.join(" · ")}
              </p>
            </div>
          </div>

          {overview.cta && (
            <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-12">
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
      </motion.div>
    </Section>
  );
}
