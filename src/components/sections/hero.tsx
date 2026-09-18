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
import {
  ArrowRight,
  Download,
  Linkedin,
  Github,
  Mail,
  Calendar,
  MapPin,
  Languages,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/tilt-card";
import { Magnetic } from "@/components/magnetic";
import { Spotlight } from "@/components/spotlight";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:min-h-[92vh] lg:flex lg:items-center"
    >
      <HeroBackground mouseX={springX} mouseY={springY} />

      <div className="container relative z-10 w-full">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          <ProfileCard />
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
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
      className="order-1 w-full max-w-lg lg:col-span-6 lg:max-w-none"
    >
      <TiltCard maxTilt={4} className="rounded-3xl">
      <Spotlight className="aurora-border depth-card rounded-3xl border border-sky-400/10 bg-card/70 backdrop-blur-2xl">
      <div className="relative p-5 sm:p-6 lg:p-7">
        <div className="flex items-center gap-4 sm:gap-5" style={{ transform: "translateZ(18px)" }}>
          <div className="relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-3xl border border-sky-400/15 bg-secondary shadow-[0_0_0_1px_rgba(56,189,248,0.1),0_16px_40px_-16px_rgba(0,0,0,0.5)] sm:w-48 lg:w-52 xl:w-60 2xl:w-64">
            {avatarOk ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(min-width: 1536px) 256px, (min-width: 1280px) 240px, (min-width: 1024px) 208px, (min-width: 640px) 192px, 160px"
                quality={95}
                className="object-cover object-center"
                onError={() => setAvatarOk(false)}
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-foreground text-background font-display text-3xl font-medium">
                {initials}
              </div>
            )}
            <span
              className="absolute bottom-3 right-3 size-3.5 rounded-full border-2 border-card bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]"
              aria-hidden
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              {profile.name}
            </h1>
            <p className="mt-1.5 text-sm text-foreground/85 text-pretty">
              {profile.role}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-3.5 shrink-0 sm:size-4" />
                Purdue University
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0 sm:size-4" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Languages className="size-3.5 shrink-0 sm:size-4" />
                {profile.languages.join(" · ")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.06] px-3.5 py-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
          <p className="text-xs leading-relaxed text-foreground/85 text-pretty">
            {profile.availability}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <ContactTile
            href={profile.socials.email}
            icon={Mail}
            label="Email"
          />
          <ContactTile
            href={profile.socials.linkedin}
            icon={Linkedin}
            label="LinkedIn"
            external
          />
          <ContactTile
            href={profile.socials.github}
            icon={Github}
            label="GitHub"
            external
          />
          <ContactTile
            href={profile.resumeUrl}
            icon={Download}
            label="Resume"
            download
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2" style={{ transform: "translateZ(12px)" }}>
          <Magnetic strength={0.16} className="w-full">
            <Button asChild className="w-full">
              <a href="#contact">
                Contact me
                <ArrowRight />
              </a>
            </Button>
          </Magnetic>
          <Magnetic strength={0.16} className="w-full">
            <Button asChild variant="secondary" className="w-full">
              <a href={profile.socials.calendly} target="_blank" rel="noopener noreferrer">
                <Calendar />
                Book a call
              </a>
            </Button>
          </Magnetic>
        </div>
      </div>
      </Spotlight>
      </TiltCard>
    </motion.aside>
  );
}

function ContactTile({
  href,
  icon: Icon,
  label,
  hint,
  external,
  download,
  className,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className={cn(
        "group flex items-center gap-2 rounded-2xl border border-border/40 bg-background/40 px-3 py-2.5 text-left transition-all duration-200 ease-out hover:border-sky-400/25 hover:bg-card/80",
        className
      )}
      aria-label={label}
    >
      <Icon className="size-4 shrink-0 text-foreground/70 transition-colors group-hover:text-foreground sm:size-[18px]" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {hint && (
          <span className="block truncate text-[11px] text-muted-foreground">
            {hint}
          </span>
        )}
      </span>
    </a>
  );
}

function HeroCopy() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={1}
      className="order-2 lg:col-span-6 lg:pl-2 lg:pt-2 xl:pl-4"
    >
      <motion.p variants={fadeUp} custom={2} className="eyebrow">
        {profile.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        custom={3}
        className="heading mt-4 text-3xl text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
      >
        <span className="gradient-text">Turning complex enterprise workflows</span>
        <span className="text-foreground"> into solutions customers actually use.</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base"
      >
        {profile.subheadline}
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="mt-8 flex flex-wrap items-center gap-2"
      >
        <Magnetic strength={0.16}>
          <Button asChild size="lg">
            <Link href="#overview">
              Read overview
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Magnetic strength={0.16}>
          <Button asChild variant="secondary" size="lg">
            <Link href="#experience">See experience</Link>
          </Button>
        </Magnetic>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={6}
        className="mt-8"
      >
        <p className="text-xs text-muted-foreground">Target roles</p>
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex flex-wrap gap-1.5">
            {profile.targetRoles.slice(0, 3).map((r) => (
              <span
                key={r}
                className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-foreground/80 backdrop-blur"
              >
                {r}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.targetRoles.slice(3).map((r) => (
              <span
                key={r}
                className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-foreground/80 backdrop-blur"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroBackground({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 16px), calc((${mouseY} - 0.5) * 12px), 0)`;
  const layer2 = useMotionTemplate`translate3d(calc((${mouseX} - 0.5) * -18px), calc((${mouseY} - 0.5) * -14px), 0)`;
  const gridShift = useMotionTemplate`translate3d(calc((${mouseX} - 0.5) * -6px), calc((${mouseY} - 0.5) * -5px), 0)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 [perspective:1200px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 52%, rgba(0,0,0,0.55) 78%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 52%, rgba(0,0,0,0.55) 78%, transparent 100%)",
      }}
    >
      <motion.div
        className="absolute inset-[-8%] grid-bg opacity-60"
        style={{ transform: gridShift }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -top-24 left-1/2 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.38),transparent_70%)] blur-3xl"
          style={{ transform: layer1 }}
        />
        <motion.div
          className="absolute top-[26%] -right-8 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.28),transparent_70%)] blur-3xl"
          style={{ transform: layer2 }}
        />
        <div className="absolute top-[48%] left-[4%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      </motion.div>
    </div>
  );
}
