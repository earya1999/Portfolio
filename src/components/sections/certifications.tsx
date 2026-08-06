"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/tilt-card";
import { certifications } from "@/lib/content";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Professional certifications."
      accent="blue"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <TiltCard maxTilt={4} className="h-full rounded-2xl">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="depth-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 transition-colors duration-200 ease-out hover:border-foreground/20 hover:bg-card"
              >
                <div
                  className="flex items-start justify-between"
                  style={{ transform: "translateZ(14px)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-secondary/80 shadow-sm">
                      <Award className="size-5 text-foreground/70" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">{c.issuer}</div>
                      {c.date ? (
                        <div className="text-xs font-mono text-muted-foreground">
                          {c.date}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <ExternalLink className="size-3.5 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
                <h3
                  className="mt-4 font-display text-base font-medium tracking-tight text-balance"
                  style={{ transform: "translateZ(10px)" }}
                >
                  {c.name}
                </h3>
                {c.credentialId && (
                  <div className="mt-1 text-[11px] font-mono text-muted-foreground">
                    ID · {c.credentialId}
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <Badge key={s} variant="muted" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </a>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
