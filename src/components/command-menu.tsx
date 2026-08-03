"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  Briefcase,
  FileText,
  Terminal,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Calendar,
  Sun,
  Moon,
  Copy,
  Download,
  ArrowRight,
  GraduationCap,
  Layers,
  Wrench,
  FolderGit2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/content";

type CommandCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = React.createContext<CommandCtx | null>(null);

export function useCommandMenu() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCommandMenu must be used within CommandMenuProvider");
  return ctx;
}

interface Item {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: "navigate" | "actions" | "social";
  keywords?: string;
}

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const { setTheme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((s) => !s);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const items: Item[] = React.useMemo(() => {
    const nav = (path: string) => () => {
      router.push(path);
      setOpen(false);
    };
    const external = (url: string) => () => {
      window.open(url, "_blank", "noopener");
      setOpen(false);
    };
    const copyEmail = () => {
      navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
      setOpen(false);
    };
    const copyLinkedInAbout = () => {
      const about = profile.linkedin?.about;
      if (!about) return;
      navigator.clipboard.writeText(about);
      toast.success("LinkedIn About copied — paste into your profile");
      setOpen(false);
    };
    const copyLinkedInHeadline = () => {
      const headline = profile.linkedin?.headline;
      if (!headline) return;
      navigator.clipboard.writeText(headline);
      toast.success("LinkedIn headline copied");
      setOpen(false);
    };
    const downloadResume = () => {
      window.open(profile.resumeUrl, "_blank");
      setOpen(false);
    };

    return [
      { id: "home", label: "Home", icon: Home, action: nav("/"), group: "navigate" },
      { id: "overview", label: "Overview", icon: Layers, action: nav("/#overview"), group: "navigate" },
      { id: "experience", label: "Experience", icon: Briefcase, action: nav("/#experience"), group: "navigate" },
      { id: "projects", label: "Projects", icon: FolderGit2, action: nav("/#projects"), group: "navigate", keywords: "github repos work" },
      { id: "skills", label: "Skills", icon: Layers, action: nav("/#skills"), group: "navigate" },
      { id: "tools", label: "Tools", icon: Wrench, action: nav("/#tools"), group: "navigate" },
      { id: "education", label: "Education", icon: GraduationCap, action: nav("/#education"), group: "navigate" },
      { id: "resume", label: "Resume", icon: FileText, action: nav("/resume"), group: "navigate" },
      { id: "terminal", label: "Terminal (Easter egg)", icon: Terminal, action: nav("/terminal"), group: "navigate", keywords: "cli command line dev" },
      { id: "contact", label: "Contact", icon: Mail, action: nav("/#contact"), group: "navigate" },

      { id: "copy-email", label: "Copy email address", icon: Copy, action: copyEmail, group: "actions" },
      { id: "copy-linkedin-headline", label: "Copy LinkedIn headline", icon: Linkedin, action: copyLinkedInHeadline, group: "actions", keywords: "sync linkedin" },
      { id: "copy-linkedin-about", label: "Copy LinkedIn About", icon: Linkedin, action: copyLinkedInAbout, group: "actions", keywords: "sync linkedin bio" },
      { id: "download-resume", label: "Download resume (PDF)", icon: Download, action: downloadResume, group: "actions" },
      { id: "theme-light", label: "Switch to light mode", icon: Sun, action: () => { setTheme("light"); setOpen(false); }, group: "actions" },
      { id: "theme-dark", label: "Switch to dark mode", icon: Moon, action: () => { setTheme("dark"); setOpen(false); }, group: "actions" },

      { id: "linkedin", label: "LinkedIn", icon: Linkedin, action: external(profile.socials.linkedin), group: "social" },
      { id: "github", label: "GitHub", icon: Github, action: external(profile.socials.github), group: "social" },
      { id: "instagram", label: "Instagram", icon: Instagram, action: external(profile.socials.instagram), group: "social" },
      { id: "calendly", label: "Book a call (Calendly)", icon: Calendar, action: external(profile.socials.calendly), group: "social" },
      { id: "email", label: "Email me", icon: Mail, action: external(profile.socials.email), group: "social" },
    ];
  }, [router, setTheme]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.description && i.description.toLowerCase().includes(q)) ||
        (i.keywords && i.keywords.toLowerCase().includes(q))
    );
  }, [items, query]);

  const grouped = React.useMemo(() => {
    const g: Record<string, Item[]> = {};
    for (const i of filtered) {
      (g[i.group] = g[i.group] || []).push(i);
    }
    return g;
  }, [filtered]);

  const groupLabel: Record<string, string> = {
    navigate: "Navigate",
    actions: "Quick actions",
    social: "Social",
  };

  return (
    <Ctx.Provider value={{ open, setOpen }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-md"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="fixed left-1/2 top-[15%] z-[70] w-[92%] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
                >
                  <Dialog.Title className="sr-only">Command menu</Dialog.Title>
                  <div className="flex items-center gap-3 border-b border-border px-4">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search pages and actions…"
                      className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      ESC
                    </kbd>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                      <div className="p-6 text-center text-sm text-muted-foreground">
                        No results.
                      </div>
                    ) : (
                      Object.entries(grouped).map(([group, gItems]) => (
                        <div key={group} className="mb-2">
                          <div className="px-2 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                            {groupLabel[group] || group}
                          </div>
                          <div className="flex flex-col">
                            {gItems.map((it) => (
                              <button
                                key={it.id}
                                onClick={it.action}
                                className={cn(
                                  "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                                  "hover:bg-secondary/60 focus:bg-secondary/60 focus:outline-none"
                                )}
                              >
                                <it.icon className="size-4 text-muted-foreground" />
                                <span className="flex-1">
                                  <span className="text-foreground">{it.label}</span>
                                  {it.description && (
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      {it.description}
                                    </span>
                                  )}
                                </span>
                                <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
                    <span>Tip: press <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono">⌘K</kbd> anywhere</span>
                    <span>{filtered.length} results</span>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </Ctx.Provider>
  );
}
