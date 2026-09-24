"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { certifications } from "@/lib/content";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      index="07"
      title="Professional certifications."
      accent="blue"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-foreground/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">{c.issuer}</div>
                {c.date ? (
                  <div className="text-xs font-mono text-muted-foreground">
                    {c.date}
                  </div>
                ) : null}
              </div>
              <ExternalLink className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="mt-4 font-display text-base font-medium tracking-tight text-balance">
              {c.name}
            </h3>
            {c.credentialId && (
              <div className="mt-1 text-[11px] font-mono text-muted-foreground">
                ID · {c.credentialId}
              </div>
            )}
            {c.skills.length > 0 && (
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {c.skills.join(" · ")}
              </p>
            )}
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
