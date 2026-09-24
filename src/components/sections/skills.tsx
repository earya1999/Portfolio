"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { skills, type SkillCategory } from "@/lib/content";

export function Skills() {
  const [active, setActive] = React.useState(skills[0]?.category ?? "");
  const activeIndex = skills.findIndex((s) => s.category === active);
  const activeCategory = skills[activeIndex] as SkillCategory;

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      index="04"
      title="Capabilities I bring to every engagement."
      accent="violet"
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
          {skills.map((cat) => {
            const isActive = cat.category === active;
            return (
              <button
                key={cat.category}
                onClick={() => setActive(cat.category)}
                className={cn(
                  "flex shrink-0 flex-col items-start border px-3.5 py-3 text-left transition-colors lg:w-full",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-foreground hover:border-foreground/40"
                )}
              >
                <span className="text-sm font-medium">{cat.category}</span>
                <span
                  className={cn(
                    "mt-0.5 hidden truncate text-xs lg:block",
                    isActive ? "text-background/70" : "text-muted-foreground"
                  )}
                >
                  {cat.description}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border border-border bg-card p-6"
        >
          <div className="mb-5">
            <h3 className="font-display text-xl font-medium tracking-tight">
              {activeCategory.category}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeCategory.description}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {activeCategory.items.map((item) => (
              <li
                key={item.name}
                className="border border-border px-3 py-1.5 text-sm text-foreground/90"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
