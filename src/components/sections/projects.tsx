"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/spotlight";
import { Magnetic } from "@/components/magnetic";
import {
  languageColor,
  type GithubProject,
} from "@/lib/github";
import { profile } from "@/lib/content";
import projectsConfig from "../../../content/projects.json";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function Projects({
  projects,
  error,
}: {
  projects: GithubProject[];
  error?: string;
}) {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={projectsConfig.title}
      description={projectsConfig.description}
      accent="blue"
    >
      {error && (
        <p className="mb-6 text-sm text-amber-500 dark:text-amber-400">
          {error}
        </p>
      )}

      {projects.length === 0 && !error ? (
        <EmptyProjects />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-end border-t border-border/60 pt-6">
        <Magnetic>
          <Button asChild variant="secondary" size="sm">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              View GitHub
              <ArrowUpRight />
            </a>
          </Button>
        </Magnetic>
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: GithubProject;
  index: number;
}) {
  const color = project.language
    ? languageColor[project.language] || "hsl(var(--muted-foreground))"
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Spotlight className="h-full rounded-2xl">
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sky-400/10 bg-card/55 transition-all duration-300 hover:border-sky-400/25 hover:bg-card/80">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-[16/9] overflow-hidden border-b border-border/50 bg-secondary/40"
            aria-label={`${project.name} preview`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                quality={90}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <ProjectPlaceholder name={project.name} language={project.language} />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90" />
          </a>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                <h3 className="truncate font-display text-lg font-semibold tracking-tight hover:underline">
                  {project.displayName}
                </h3>
              </a>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.name}
                {project.pushedAt || project.updatedAt
                  ? ` · Updated ${formatDate(project.pushedAt || project.updatedAt)}`
                  : ""}
              </p>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.displayName} on GitHub`}
              className="shrink-0 text-muted-foreground transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-foreground"
            >
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <p className="mt-3 text-sm text-foreground/85 text-pretty">
            {project.description}
          </p>
          {project.outcome && (
            <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
              {project.outcome}
            </p>
          )}

            {project.topics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.topics.slice(0, 4).map((t) => (
                  <Badge key={t} variant="muted" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {project.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color || undefined }}
                    aria-hidden
                  />
                  {project.language}
                </span>
              )}
              {project.stars > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" />
                  {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" />
                  {project.forks}
                </span>
              )}
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-foreground/70 hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  Live
                </a>
              )}
            </div>
          </div>
        </article>
      </Spotlight>
    </motion.div>
  );
}

function ProjectPlaceholder({
  name,
  language,
}: {
  name: string;
  language: string | null;
}) {
  const initials = name
    .split(/[-_]/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(52,211,153,0.18),transparent_50%),hsl(var(--card))]">
      <div className="text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-background/50 font-display text-lg font-semibold tracking-tight backdrop-blur">
          {initials || "PR"}
        </div>
        {language && (
          <p className="mt-3 text-xs text-muted-foreground">{language}</p>
        )}
      </div>
    </div>
  );
}

function EmptyProjects() {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 px-6 py-12 text-center">
      <Github className="mx-auto size-8 text-muted-foreground" />
      <h3 className="mt-4 font-display text-lg font-semibold">
        Projects coming soon
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground text-pretty">
        In the meantime, you can browse my work on GitHub.
      </p>
      <Magnetic className="mt-6">
        <Button asChild>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
            <ArrowUpRight />
          </a>
        </Button>
      </Magnetic>
    </div>
  );
}
