"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Calendar } from "lucide-react";
import { profile } from "@/lib/content";

const socials = [
  { href: profile.socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: profile.socials.github, label: "GitHub", icon: Github },
  { href: profile.socials.instagram, label: "Instagram", icon: Instagram },
  { href: profile.socials.calendly, label: "Calendly", icon: Calendar },
  { href: profile.socials.email, label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-14 no-print">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
                EA
              </span>
              <span className="font-medium">{profile.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground text-pretty">
              {profile.subheadline}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {profile.location} · {profile.languages.join(" · ")}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li><Link className="hover:text-foreground text-muted-foreground transition-colors duration-200" href="/#overview">Overview</Link></li>
              <li><Link className="hover:text-foreground text-muted-foreground transition-colors duration-200" href="/#experience">Experience</Link></li>
              <li><Link className="hover:text-foreground text-muted-foreground transition-colors duration-200" href="/#projects">Projects</Link></li>
              <li><Link className="hover:text-foreground text-muted-foreground transition-colors duration-200" href="/#skills">Skills</Link></li>
              <li><Link className="hover:text-foreground text-muted-foreground transition-colors duration-200" href="/#education">Education</Link></li>
              <li><Link className="hover:text-foreground text-muted-foreground transition-colors duration-200" href="/resume">Resume</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Connect
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <s.icon className="size-3.5" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js & Framer Motion.</p>
          <p className="font-mono">
            Press <kbd className="rounded border border-border bg-muted px-1 py-0.5">⌘K</kbd> anywhere · <span className="text-foreground/80">v1.1</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
