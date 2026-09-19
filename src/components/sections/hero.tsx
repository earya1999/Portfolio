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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { profile } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.06 * i, ease },
  }),
};

export function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-14"
    >
      <HeroBackground mouseX={springX} mouseY={springY} />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <Portrait />
          <HeroCopy />
        </div>
      </div>
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
      className="order-1 flex w-full flex-col items-center gap-4 lg:col-span-4 lg:items-start"
    >
      <div className="relative aspect-[3/4] w-full max-w-[15.5rem] overflow-hidden sm:max-w-[16.5rem] lg:max-w-[17.5rem]">
        {avatarOk ? (
          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease }}
            className="absolute inset-0"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 264px, 248px"
              quality={95}
              className="object-cover object-center"
              onError={() => setAvatarOk(false)}
              priority
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-foreground font-display text-4xl font-medium text-background">
            {initials}
          </div>
        )}
        {/* Soft edge into canvas — editorial, not a card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/25"
        />
      </div>

      <div className="flex w-full max-w-[15.5rem] items-center justify-between gap-4 sm:max-w-[16.5rem] lg:max-w-[17.5rem]">
        <div className="flex items-center gap-0.5">
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
        <a
          href={profile.socials.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground/55 transition-colors hover:text-foreground"
        >
          <Calendar className="size-3.5" />
          Book a call
        </a>
      </div>
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
      className="inline-flex size-9 items-center justify-center text-foreground/50 transition-colors hover:text-foreground"
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
      className="order-2 flex flex-col lg:col-span-7 lg:max-w-[40rem] xl:max-w-[44rem]"
    >
      <motion.p
        variants={fadeUp}
        custom={2}
        className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-300/70"
      >
        {profile.eyebrow}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        custom={3}
        className="mt-5 font-display text-[2.75rem] font-medium leading-[0.95] tracking-tight text-foreground sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.35rem]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mt-3 text-[15px] font-medium tracking-wide text-sky-200/65 sm:text-base"
      >
        {profile.role}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        custom={5}
        className="mt-8 font-display text-[1.55rem] font-medium leading-[1.2] tracking-tight text-balance sm:text-[1.85rem] lg:text-[2.05rem]"
      >
        <span className="text-foreground">
          Turning complex enterprise workflows
        </span>{" "}
        <span className="text-foreground/50">
          into solutions customers actually use.
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={6}
        className="mt-5 max-w-xl text-[15px] leading-[1.7] text-muted-foreground text-pretty sm:text-[16px]"
      >
        {profile.subheadline}
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={7}
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
      >
        <Magnetic strength={0.12}>
          <Button asChild size="lg" className="rounded-md shadow-none">
            <Link href="#overview">
              Read overview
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Link
          href="#experience"
          className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground/65 transition-colors hover:text-foreground"
        >
          See experience
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href="#contact"
          className="text-[15px] font-medium text-foreground/45 transition-colors hover:text-foreground"
        >
          Contact
        </a>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={8}
        className="mt-10 space-y-2 border-t border-white/[0.08] pt-6"
      >
        <p className="text-[13px] leading-relaxed text-foreground/55">
          Purdue University
          <span className="mx-2 text-foreground/25">·</span>
          {profile.location}
          <span className="mx-2 text-foreground/25">·</span>
          Open to relocation
        </p>
        <p className="text-[13px] leading-relaxed text-foreground/40">
          {profile.targetRoles.join("  ·  ")}
        </p>
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
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 10px), calc((${mouseY} - 0.5) * 8px), 0)`;
  const gridShift = useMotionTemplate`translate3d(calc((${mouseX} - 0.5) * -3px), calc((${mouseY} - 0.5) * -2px), 0)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.45) 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.45) 82%, transparent 100%)",
      }}
    >
      <motion.div
        className="absolute inset-[-8%] grid-bg opacity-25"
        style={{ transform: gridShift }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -top-20 left-[48%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent_72%)] blur-3xl"
          style={{ transform: layer1 }}
        />
      </motion.div>
    </div>
  );
}
