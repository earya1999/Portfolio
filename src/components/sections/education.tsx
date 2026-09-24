"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Section } from "@/components/ui/section";
import { OrgLogo } from "@/components/org-logo";
import { education } from "@/lib/content";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      index="03"
      title="Business analytics, built on a CS foundation."
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {education.map((e, i) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="flex h-full flex-col rounded-md border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground/25"
          >
            <div className="flex items-start gap-4">
              <OrgLogo src={e.logo} alt={e.school} size={68} />
              <div className="min-w-0">
                <h3 className="font-display text-base font-medium tracking-tight text-balance sm:text-lg">
                  {e.school}
                </h3>
                <p className="text-xs text-muted-foreground">{e.department}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-sm font-medium">{e.degree}</div>
              <div className="text-sm text-foreground/80">{e.field}</div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {e.start} — {e.end}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {e.location}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-foreground/75">
                CGPA {e.gpa}
              </span>
            </div>

            <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-foreground/85">
              {e.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/50" />
                  <span className="text-pretty">{h}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
