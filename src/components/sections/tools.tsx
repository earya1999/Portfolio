"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { tools } from "@/lib/content";

const groupOrder = ["Data", "Analytics", "Platforms", "ERP", "Cloud", "Integrations", "Delivery", "AI"];

export function Tools() {
  return (
    <Section
      id="tools"
      eyebrow="Tools"
      title="What I reach for on any given day."
      description="The stack behind discovery, configuration, integrations, and adoption work — plus the AI tools I use to move faster."
      accent="amber"
    >
      <div className="flex flex-col gap-8">
        {groupOrder.map((group) => {
          const items = tools.filter((t) => t.category === group);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <div className="eyebrow">{group}</div>
                <div className="h-px flex-1 bg-border/60" />
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card/60 p-4 transition-all hover:border-foreground/20 hover:bg-card"
                  >
                    <ToolIcon name={tool.icon} label={tool.name} />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{tool.name}</div>
                      <p className="mt-1 text-xs text-muted-foreground text-pretty">
                        {tool.note}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ToolIcon({ name, label }: { name: string; label: string }) {
  // Simple monogram-first icon set. Uses currentColor and keeps licensing clean.
  const initials = label
    .split(/[\s/-]/)
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  const monogram = (
    <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground/70">
      {initials.toUpperCase()}
    </span>
  );

  const map: Record<string, React.ReactElement> = {
    database: (
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground/70">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      </span>
    ),
    code: (
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground/70">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </span>
    ),
    barChart: (
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground/70">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      </span>
    ),
    table: (
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground/70">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      </span>
    ),
    api: (
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground/70">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <path d="M4 12h4M16 12h4M12 4v4M12 16v4" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
    ),
    github: (
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground/70">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
        </svg>
      </span>
    ),
    openai: monogram,
    anthropic: monogram,
    salesforce: monogram,
    sap: monogram,
    oracle: monogram,
    microsoft: monogram,
    azure: monogram,
    mongodb: monogram,
    jira: monogram,
  };

  return map[name] || monogram;
}
