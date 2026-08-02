"use client";

import * as React from "react";
import { profile, experience, skills, education } from "@/lib/content";

type Line = { kind: "out" | "in"; text: string };

const banner = `
                                                          
   ███████╗ █████╗ ██████╗ ██╗   ██╗ █████╗               
   ██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗              
   █████╗  ███████║██████╔╝ ╚████╔╝ ███████║              
   ██╔══╝  ██╔══██║██╔══██╗  ╚██╔╝  ██╔══██║              
   ███████╗██║  ██║██║  ██║   ██║   ██║  ██║              
   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝              
                                                          
   Welcome. Type 'help' to get started.
`;

export function Terminal() {
  const [lines, setLines] = React.useState<Line[]>([
    { kind: "out", text: banner },
  ]);
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = React.useState<number>(-1);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
      }
    });
  };

  const write = (text: string) =>
    setLines((prev) => [...prev, { kind: "out", text }]);

  const commands: Record<string, (arg: string) => string | void> = {
    help: () => `Available commands:
  help                     Show this help
  whoami                   Who is Eshaan?
  about                    Elevator pitch
  ls                       List sections (try: ls skills, ls experience, ls education)
  cat <section>            Show a section (about, positioning, availability)
  experience               Show career timeline
  education                Show education
  skills                   Show skill categories
  contact                  Contact details
  social                   Social profiles
  clear                    Clear the screen
  theme <dark|light>       Switch theme (open ⌘K for the full command menu)
  sudo hire-me             ;)`,
    whoami: () =>
      `${profile.name} — ${profile.role}\n${profile.location}\n${profile.headline}`,
    about: () => profile.subheadline,
    social: () =>
      Object.entries(profile.socials)
        .filter(([, v]) => v)
        .map(([k, v]) => `  ${k.padEnd(10)} ${v}`)
        .join("\n"),
    contact: () =>
      `email     ${profile.email}\nlinkedin  ${profile.socials.linkedin}\ncalendly  ${profile.socials.calendly}`,
    experience: () =>
      experience
        .map(
          (e) =>
            `${e.start.padEnd(9)} — ${e.end.padEnd(9)}  ${e.role}\n              ${e.company}`
        )
        .join("\n\n"),
    education: () =>
      education
        .map(
          (e) =>
            `${e.start} — ${e.end}\n  ${e.degree}, ${e.field}\n  ${e.school}, ${e.department}`
        )
        .join("\n\n"),
    skills: () =>
      skills
        .map(
          (s) =>
            `[${s.category}]\n  ${s.items.map((i) => i.name).join(", ")}`
        )
        .join("\n\n"),
    ls: (arg) => {
      const target = arg.trim();
      if (!target) {
        return "Sections:\n  overview  experience  education  skills  tools  contact  social";
      }
      if (target === "experience") return commands.experience("");
      if (target === "education") return commands.education("");
      if (target === "skills") return commands.skills("");
      return `ls: cannot access '${target}': No such section`;
    },
    cat: (arg) => {
      const key = arg.trim();
      if (key === "about") return profile.subheadline;
      if (key === "positioning") return profile.positioning;
      if (key === "availability") return profile.availability;
      return `cat: ${key}: No such section (try: about, positioning, availability)`;
    },
    clear: () => {
      setLines([]);
      return;
    },
    theme: (arg) => {
      const t = arg.trim().toLowerCase();
      if (t === "dark" || t === "light") {
        document.documentElement.classList.toggle("dark", t === "dark");
        return `Theme set to ${t}. (Tip: press ⌘K for the full command menu.)`;
      }
      return "Usage: theme <dark|light>";
    },
    sudo: (arg) => {
      const cmd = arg.trim().toLowerCase();
      if (cmd === "hire-me") {
        return "Access granted. Opening Calendly…\n→ " + profile.socials.calendly;
      }
      return `sudo: ${cmd}: command not found`;
    },
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setLines((prev) => [...prev, { kind: "in", text: `~ ${trimmed}` }]);
    setHistory((h) => [trimmed, ...h].slice(0, 20));
    setHistoryIdx(-1);
    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    const fn = commands[cmd];
    if (!fn) {
      write(`command not found: ${cmd}  (try: help)`);
    } else {
      const out = fn(arg);
      if (out !== undefined) write(String(out));
      if (cmd === "sudo" && arg.trim().toLowerCase() === "hire-me") {
        setTimeout(() => window.open(profile.socials.calendly, "_blank"), 500);
      }
    }
    scrollToBottom();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistoryIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setValue(next === -1 ? "" : history[next]);
    }
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border/60 bg-black/90 font-mono text-[13px] text-emerald-300 shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2">
        <span className="size-3 rounded-full bg-red-500/70" />
        <span className="size-3 rounded-full bg-yellow-500/70" />
        <span className="size-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-white/40">eshaan@portfolio ~ /bin/zsh</span>
      </div>
      <div
        ref={scrollerRef}
        className="h-[520px] overflow-y-auto p-4 leading-relaxed"
      >
        {lines.map((l, i) => (
          <pre
            key={i}
            className={
              l.kind === "in"
                ? "whitespace-pre-wrap text-white/80"
                : "whitespace-pre-wrap text-emerald-300/90"
            }
          >
            {l.text}
          </pre>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">~</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-white/90 outline-none placeholder:text-white/30"
            placeholder="type help"
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
