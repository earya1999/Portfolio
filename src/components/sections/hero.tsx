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
      className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-16"
    >
      <HeroBackground mouseX={springX} mouseY={springY} />

      <div className="container relative z-10 w-full">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
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
      className="order-1 w-full max-w-lg lg:col-span-5 lg:max-w-none"
    >
      <TiltCard maxTilt={4} className="rounded-3xl">
        <Spotlight className="aurora-border depth-card rounded-3xl border border-sky-400/10 bg-card/70 backdrop-blur-2xl">
          <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-4 sm:p-4">
            <div className="relative mx-auto aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-[1.35rem] border border-sky-400/15 bg-secondary shadow-[0_0_0_1px_rgba(56,189,248,0.1),0_16px_40px_-16px_rgba(0,0,0,0.5)] sm:mx-0 sm:w-48 lg:w-52 xl:w-60 2xl:w-64">
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
                <div className="flex h-full w-full items-center justify-center bg-foreground font-display text-3xl font-medium text-background">
                  {initials}
                </div>
              )}
              <span
                className="absolute bottom-2.5 right-2.5 size-3 rounded-full border-2 border-card bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]"
                aria-hidden
              />
            </div>

            <div
              className="flex min-w-0 flex-1 flex-col"
              style={{ transform: "translateZ(18px)" }}
            >
              <h1 className="font-display text-[1.65rem] font-medium leading-none tracking-tight sm:text-[1.7rem]">
                {profile.name}
              </h1>
              <p className="mt-1.5 text-sm leading-snug text-foreground/85">
                {profile.role}
              </p>
              <div className="mt-2 space-y-1 text-xs leading-snug text-muted-foreground sm:text-[13px]">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="size-3.5 shrink-0" />
                  Purdue University
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Languages className="size-3.5 shrink-0" />
                  {profile.languages.join(" · ")}
                </span>
              </div>

              <p className="mt-2.5 flex items-start gap-2 text-[11px] leading-relaxed text-foreground/80 sm:text-xs">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-pretty">{profile.availability}</span>
              </p>

              <div className="mt-2.5 flex items-center gap-1.5">
                <IconLink href={profile.socials.email} icon={Mail} label="Email" />
                <IconLink
                  href={profile.socials.linkedin}
                  icon={Linkedin}
                  label="LinkedIn"
                  external
                />
                <IconLink
                  href={profile.socials.github}
                  icon={Github}
                  label="GitHub"
                  external
                />
                <IconLink
                  href={profile.resumeUrl}
                  icon={Download}
                  label="Resume"
                  download
                />
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <Button asChild size="sm" className="w-full">
                  <a href="#contact">
                    Contact me
                    <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <a
                    href={profile.socials.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar />
                    Book a call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Spotlight>
      </TiltCard>
    </motion.aside>
  );
}

function IconLink({
  href,
  icon: Icon,
  label,
  external,
  download,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      title={label}
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-full border border-border/50 bg-background/40 text-foreground/70 transition-colors hover:border-sky-400/30 hover:bg-card/80 hover:text-foreground"
    >
      <Icon className="size-3.5" />
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
      className="order-2 flex flex-col lg:col-span-7"
    >
      <motion.p variants={fadeUp} custom={2} className="eyebrow">
        {profile.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        custom={3}
        className="heading mt-2.5 text-[1.85rem] leading-[1.12] tracking-tight text-balance sm:text-[2.35rem] lg:text-[2.5rem] xl:text-[2.65rem]"
      >
        <span className="gradient-text">Turning complex enterprise workflows</span>
        <span className="text-foreground"> into solutions customers actually use.</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[15px]"
      >
        {profile.subheadline}
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="mt-2.5 flex flex-wrap items-center gap-2"
      >
        <Magnetic strength={0.16}>
          <Button asChild>
            <Link href="#overview">
              Read overview
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Magnetic strength={0.16}>
          <Button asChild variant="secondary">
            <Link href="#experience">See experience</Link>
          </Button>
        </Magnetic>
      </motion.div>

      <motion.div variants={fadeUp} custom={6} className="mt-2.5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Target roles
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {profile.targetRoles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-foreground/80 backdrop-blur"
            >
              {r}
            </span>
          ))}
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
