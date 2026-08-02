"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { skills, type SkillCategory } from "@/lib/content";

type Accent = {
  chipBg: string;
  chipRing: string;
  chipText: string;
  activeBg: string;
  activeText: string;
  bar: string;
};

// Ordered to match the order of categories in content/skills.json
const accents: Accent[] = [
  {
    // Implementation & Consulting → sky
    chipBg: "bg-sky-500/12",
    chipRing: "ring-sky-500/30",
    chipText: "text-sky-500 dark:text-sky-400",
    activeBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    activeText: "text-white",
    bar: "bg-gradient-to-r from-sky-400 to-blue-500",
  },
  {
    // Technical & Integrations → emerald
    chipBg: "bg-emerald-500/12",
    chipRing: "ring-emerald-500/30",
    chipText: "text-emerald-500 dark:text-emerald-400",
    activeBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    activeText: "text-white",
    bar: "bg-gradient-to-r from-emerald-400 to-teal-500",
  },
  {
    // Analytics → violet
    chipBg: "bg-violet-500/12",
    chipRing: "ring-violet-500/30",
    chipText: "text-violet-500 dark:text-violet-400",
    activeBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    activeText: "text-white",
    bar: "bg-gradient-to-r from-violet-400 to-purple-500",
  },
  {
    // Product & Customer → amber
    chipBg: "bg-amber-500/12",
    chipRing: "ring-amber-500/30",
    chipText: "text-amber-500 dark:text-amber-400",
    activeBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    activeText: "text-white",
    bar: "bg-gradient-to-r from-amber-400 to-orange-500",
  },
  {
    // AI → rose
    chipBg: "bg-rose-500/12",
    chipRing: "ring-rose-500/30",
    chipText: "text-rose-500 dark:text-rose-400",
    activeBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    activeText: "text-white",
    bar: "bg-gradient-to-r from-rose-400 to-pink-500",
  },
];

export function Skills() {
  const [active, setActive] = React.useState(skills[0]?.category ?? "");
  const activeIndex = skills.findIndex((s) => s.category === active);
  const activeCategory = skills[activeIndex] as SkillCategory;
  const activeAccent = accents[activeIndex] ?? accents[0];

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Grouped by how I actually use them on deployments."
      accent="violet"
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
          {skills.map((cat, i) => {
            const Icon =
              (LucideIcons as unknown as Record<
                string,
                React.ComponentType<{ className?: string }>
              >)[cat.icon] || LucideIcons.Circle;
            const a = accents[i] ?? accents[0];
            const isActive = cat.category === active;
            return (
              <button
                key={cat.category}
                onClick={() => setActive(cat.category)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl border p-3 text-left transition-all lg:w-full",
                  isActive
                    ? "border-foreground/20 bg-card"
                    : "border-border/60 bg-transparent hover:border-foreground/10 hover:bg-card/60"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg ring-1 transition-all",
                    isActive
                      ? `${a.activeBg} ${a.activeText} ring-transparent shadow-md`
                      : `${a.chipBg} ${a.chipText} ${a.chipRing}`
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{cat.category}</div>
                  <div className="hidden truncate text-xs text-muted-foreground lg:block">
                    {cat.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border/60 bg-card/60 p-6"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold">
                {activeCategory.category}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeCategory.description}
              </p>
            </div>
            <span
              className={cn(
                "hidden shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ring-1 sm:inline-flex",
                activeAccent.chipBg,
                activeAccent.chipText,
                activeAccent.chipRing
              )}
            >
              {activeCategory.items.length} skills
            </span>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {activeCategory.items.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {item.level}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                    className={cn("h-full rounded-full", activeAccent.bar)}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
