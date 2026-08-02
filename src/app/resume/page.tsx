import type { Metadata } from "next";
import { Download, Mail, Linkedin, Github, MapPin, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PrintButton } from "@/components/print-button";
import {
  profile,
  experience,
  education,
  skills,
  certifications,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${profile.name}. Downloadable PDF and print-friendly preview.`,
};

export default function ResumePage() {
  const technicalSkills = skills
    .flatMap((s) => s.items.map((i) => i.name))
    .slice(0, 30);

  return (
    <div className="pt-32">
      <Section
        eyebrow="Resume"
        title="One-page, PDF-first."
        description="Embedded preview below. Download the PDF, print this page, or read the machine-readable summary."
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 no-print">
          <Button asChild>
            <a href={profile.resumeUrl} download>
              <Download />
              Download PDF
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Open in new tab
            </a>
          </Button>
          <PrintButton />
          <Button asChild variant="ghost">
            <a href={profile.vcardUrl} download>
              <Download />
              vCard
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin />
              LinkedIn
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 no-print">
          <object
            data={profile.resumeUrl}
            type="application/pdf"
            className="h-[calc(100vh-16rem)] min-h-[600px] w-full bg-background"
          >
            <div className="p-8 text-center text-sm text-muted-foreground">
              <p>Your browser doesn&apos;t render inline PDFs.</p>
              <p className="mt-2">
                <a
                  href={profile.resumeUrl}
                  className="underline hover:text-foreground"
                  download
                >
                  Download the PDF instead
                </a>
              </p>
            </div>
          </object>
        </div>

        <div className="mt-16 rounded-2xl border border-border/60 bg-card/60 p-8 md:p-10">
          <header className="border-b border-border/60 pb-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 hover:text-foreground">
                <Mail className="size-3" />
                {profile.email}
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-foreground">
                <Linkedin className="size-3" />
                LinkedIn
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-foreground">
                <Github className="size-3" />
                GitHub
              </a>
            </div>
          </header>

          <section className="mt-6">
            <h3 className="eyebrow">Summary</h3>
            <p className="mt-2 text-sm text-foreground/90 text-pretty">
              {profile.subheadline}
            </p>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow">Experience</h3>
            <div className="mt-3 space-y-6">
              {experience.map((e) => (
                <div key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="font-medium">{e.role}</div>
                      <div className="text-xs text-muted-foreground">
                        {e.company} · {e.location}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {e.start} — {e.end}
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-foreground/85">
                    {e.highlights.slice(0, 5).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow">Education</h3>
            <div className="mt-3 space-y-4">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="font-medium">
                        {e.degree}, {e.field}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {e.school}, {e.department} · {e.location} · CGPA {e.gpa}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {e.start} — {e.end}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {technicalSkills.map((s) => (
                <Badge key={s} variant="muted" className="text-[10px]">
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow">Certifications</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {certifications.map((c) => (
                <li key={c.name} className="flex justify-between gap-4">
                  <span>
                    {c.name} —{" "}
                    <span className="text-muted-foreground">{c.issuer}</span>
                  </span>
                  <span className="text-muted-foreground">{c.date || "—"}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>
    </div>
  );
}

