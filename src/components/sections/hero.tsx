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
  Instagram,
  Mail,
  Calendar,
  MapPin,
  Languages,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/tilt-card";
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
      className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:min-h-[92vh] lg:flex lg:items-center"
    >
      <HeroBackground mouseX={springX} mouseY={springY} />

      <div className="container relative z-10 w-full">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
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
      className="lg:col-span-5"
    >
      <TiltCard maxTilt={7} className="rounded-2xl">
      <div className="depth-card rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur-xl sm:p-7">
        <div className="flex items-start gap-5" style={{ transform: "translateZ(18px)" }}>
          <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary shadow-lg sm:w-32">
            {avatarOk ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(min-width: 640px) 128px, 112px"
                className="object-cover object-top"
                onError={() => setAvatarOk(false)}
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-foreground text-background text-2xl font-semibold">
                {initials}
              </div>
            )}
            <span
              className="absolute bottom-2 right-2 size-3 rounded-full border-2 border-card bg-emerald-500 shadow-md"
              aria-hidden
            />
          </div>

          <div className="min-w-0 flex-1 py-1">
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm text-foreground/80 text-pretty">
              {profile.role}
            </p>
            <div className="mt-3 flex flex-col gap-1 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-3" />
                Purdue University
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Languages className="size-3" />
                {profile.languages.join(" · ")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-2.5">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
          <p className="text-[11px] leading-relaxed text-foreground/85 text-pretty">
            {profile.availability}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <ContactTile
            href={profile.socials.email}
            icon={Mail}
            label="Email"
            hint={profile.email}
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
            href={profile.socials.instagram}
            icon={Instagram}
            label="Instagram"
            external
          />
          <ContactTile
            href={profile.socials.calendly}
            icon={Calendar}
            label="Book a call"
            external
          />
          <ContactTile
            href={profile.resumeUrl}
            icon={Download}
            label="Resume"
            download
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2" style={{ transform: "translateZ(12px)" }}>
          <Button asChild size="sm">
            <a href="#contact">
              Contact me
              <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <a href={profile.resumeUrl} download>
              <Download />
              Download resume
            </a>
          </Button>
        </div>
      </div>
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
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5 text-left transition-all hover:border-foreground/20 hover:bg-card"
      aria-label={label}
    >
      <Icon className="size-4 shrink-0 text-foreground/70 transition-colors group-hover:text-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium">{label}</span>
        {hint && (
          <span className="block truncate text-[10px] text-muted-foreground">
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
      className="lg:col-span-7 lg:pl-6"
    >
      <motion.p variants={fadeUp} custom={2} className="eyebrow">
        {profile.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        custom={3}
        className="heading mt-3 text-3xl font-semibold text-balance sm:text-5xl md:text-6xl"
      >
        <span className="gradient-text">Turning complex enterprise workflows</span>
        <span className="text-foreground"> into solutions customers actually use.</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mt-5 max-w-2xl text-sm text-muted-foreground text-pretty sm:text-base"
      >
        {profile.subheadline}
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="mt-7 flex flex-wrap items-center gap-2"
      >
        <Button asChild size="lg">
          <Link href="#overview">
            Read overview
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="#experience">See experience</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
            LinkedIn
          </a>
        </Button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={6}
        className="mt-7 flex flex-wrap items-center gap-1.5"
      >
        <span className="mr-1 text-xs text-muted-foreground">Open to:</span>
        {profile.targetRoles.map((r) => (
          <span
            key={r}
            className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-foreground/80 backdrop-blur"
          >
            {r}
          </span>
        ))}
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
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 28px), calc((${mouseY} - 0.5) * 22px), 0)`;
  const layer2 = useMotionTemplate`translate3d(calc((${mouseX} - 0.5) * -36px), calc((${mouseY} - 0.5) * -28px), 0)`;
  const layer3 = useMotionTemplate`translate3d(calc((${mouseX} - 0.5) * 44px), calc((${mouseY} - 0.5) * 18px), 0)`;
  const gridShift = useMotionTemplate`translate3d(calc((${mouseX} - 0.5) * -12px), calc((${mouseY} - 0.5) * -10px), 0)`;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 [perspective:1200px]">
      <motion.div
        className="absolute inset-[-8%] grid-bg opacity-70"
        style={{ transform: gridShift }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -top-32 left-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.38),transparent_70%)] blur-3xl"
          style={{ transform: layer1 }}
        />
        <motion.div
          className="absolute top-[30%] -right-16 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.34),transparent_70%)] blur-3xl"
          style={{ transform: layer2 }}
        />
        <motion.div
          className="absolute top-[38%] -left-16 h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.32),transparent_70%)] blur-3xl"
          style={{ transform: layer3 }}
        />
      </motion.div>
      {/* Tall soft fade so the hero dissolves into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
