"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { profile } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.04 * i, ease },
  }),
};

const HERO_ROLES = profile.targetRoles.slice(0, 3);

const PAGE_INDEX = [
  { href: "#overview", label: "Overview" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-20 pb-28 sm:pt-24 sm:pb-32"
    >
      <HeroBackground mouseX={springX} mouseY={springY} />

      <div className="relative z-10 mx-auto w-full max-w-[980px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-9 sm:gap-10 lg:flex-row lg:items-center lg:gap-11">
          <Portrait />
          <HeroCopy />
        </div>
      </div>

      <PageIndex />
    </section>
  );
}

function Portrait() {
  const [avatarOk, setAvatarOk] = React.useState(true);
  const initials = profile.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={0}
      className="shrink-0"
    >
      <div className="relative aspect-[3/4] w-[13.5rem] overflow-hidden rounded-2xl shadow-[0_18px_48px_-20px_rgba(15,23,42,0.4)] dark:shadow-[0_24px_64px_-28px_rgba(0,0,0,0.85)] sm:w-[14.75rem] lg:w-[15.25rem]">
        {avatarOk ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease }}
            className="absolute inset-0"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="244px"
              quality={95}
              className="object-cover object-[center_20%]"
              onError={() => setAvatarOk(false)}
              priority
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-foreground font-display text-4xl font-medium text-background">
            {initials}
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10"
        />
      </div>
    </motion.aside>
  );
}

function HeroCopy() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={1}
      className="flex w-full max-w-xl flex-col text-center lg:max-w-none lg:text-left"
    >
      <motion.h1
        variants={fadeUp}
        custom={2}
        className="font-display text-[2.65rem] font-medium leading-[0.96] tracking-tight text-foreground sm:text-[3.35rem] lg:text-[3.65rem]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={3}
        className="mt-3 text-[15px] font-semibold tracking-[0.04em] text-sky-800 dark:text-sky-200/90 sm:text-[16px]"
      >
        {profile.role}
      </motion.p>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mx-auto mt-5 max-w-md font-display text-[1.2rem] font-medium leading-[1.35] tracking-tight text-balance text-foreground/90 sm:text-[1.3rem] lg:mx-0 lg:max-w-lg"
      >
        Turning complex enterprise workflows into solutions customers actually
        use.
      </motion.p>

      <motion.p
        variants={fadeUp}
        custom={5}
        className="mt-5 text-[13px] leading-relaxed text-muted-foreground"
      >
        <span className="font-medium text-foreground/85">
          {profile.highlights.experience}
        </span>
        <span className="mx-2 text-foreground/25">·</span>
        <span className="font-medium text-foreground/85">
          {profile.highlights.degree}
        </span>
        <span className="mx-2 text-foreground/25">·</span>
        Open to relocation
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={6}
        className="mt-4 text-[13px] leading-relaxed text-muted-foreground"
      >
        <span className="text-foreground/50">Open to </span>
        <span className="font-medium text-foreground">
          {HERO_ROLES.join(" · ")}
        </span>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={7}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start"
      >
        <Magnetic strength={0.08}>
          <Button asChild size="lg" className="rounded-md px-6 shadow-none">
            <Link href="#overview">
              Read overview
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Link
          href="#contact"
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Contact me
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function PageIndex() {
  return (
    <motion.nav
      aria-label="Page sections"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease }}
      className="absolute inset-x-0 bottom-0 z-10 border-t border-border/80 bg-gradient-to-t from-background via-background/90 to-transparent"
    >
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {PAGE_INDEX.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#overview"
          className="hidden items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          aria-label="Continue to overview"
        >
          Continue
          <ArrowDown className="size-3" />
        </a>
      </div>
    </motion.nav>
  );
}

function HeroBackground({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 5px), calc((${mouseY} - 0.5) * 4px), 0)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.3) 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.3) 90%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-[0.14] dark:opacity-[0.07]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="absolute inset-0"
      >
        {/* Light: cooler steel wash · Dark: soft cyan glow */}
        <motion.div
          className="absolute top-[-10%] left-[42%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(14,116,144,0.16),transparent_70%)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(56,189,248,0.08),transparent_70%)]"
          style={{ transform: layer1 }}
        />
      </motion.div>
    </div>
  );
}
