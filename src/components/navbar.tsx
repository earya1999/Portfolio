"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandMenu } from "@/components/command-menu";
import { profile } from "@/lib/content";

const links = [
  { href: "/#overview", label: "Overview" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { setOpen: setCmdOpen } = useCommandMenu();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 no-print",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full border border-sky-400/15 bg-background/55 px-4 py-2 backdrop-blur-2xl backdrop-saturate-150 transition-all",
            scrolled && "border-sky-400/25 shadow-[0_8px_32px_-12px_rgba(56,189,248,0.25)]"
          )}
        >
          <Link href="/" className="group flex items-center gap-2 pl-1">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-foreground text-background shadow-[0_0_16px_rgba(56,189,248,0.35)]">
              <span className="text-xs font-semibold">EA</span>
            </span>
            <span className="hidden text-sm font-medium sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground md:inline-flex"
              aria-label="Open command menu"
            >
              <Command className="size-3.5" />
              <span>Search</span>
            </button>
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              <a href={profile.resumeUrl} download>
                <Download />
                Resume
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/#contact">Contact</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container mt-2 lg:hidden"
          >
            <div className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/95 p-3 backdrop-blur-xl">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/resume"
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                Resume
              </Link>
              <Button asChild size="sm" className="mt-2">
                <Link href="/#contact">Contact me</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
