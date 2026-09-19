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
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { profile } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.05 * i, ease },
  }),
};

/** Primary hiring targets shown on the fold; full list lives in Overview. */
const HERO_ROLES = profile.targetRoles.slice(0, 3);

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

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14 lg:pt-6">
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
      className="order-1 flex w-full justify-center lg:col-span-4 lg:justify-start"
    >
      <div className="relative aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-xl sm:max-w-[16rem] lg:max-w-[17rem]">
        {avatarOk ? (
          <motion.div
            initial={{ scale: 1.03, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease }}
            className="absolute inset-0"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 272px, (min-width: 640px) 256px, 240px"
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
        {/* Soft edge blend into the canvas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_48px_18px_hsl(var(--background))]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06]"
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
      className="order-2 flex flex-col lg:col-span-8 lg:max-w-[38rem] xl:max-w-[42rem] lg:pt-1"
    >
      <motion.h1
        variants={fadeUp}
        custom={2}
        className="font-display text-[2.6rem] font-medium leading-[0.96] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.75rem]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={3}
        className="mt-3 text-base font-medium tracking-wide text-sky-200/90 sm:text-lg"
      >
        {profile.role}
      </motion.p>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mt-6 max-w-xl font-display text-[1.35rem] font-medium leading-[1.3] tracking-tight text-balance text-foreground/80 sm:text-[1.55rem]"
      >
        Turning complex enterprise workflows into solutions customers actually
        use.
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="mt-7 space-y-2.5"
      >
        <p className="text-[14px] leading-relaxed text-foreground/70">
          <span className="font-medium text-foreground/90">Purdue University</span>
          <span className="mx-2 text-foreground/25">·</span>
          <span className="text-foreground/45">{profile.location}</span>
          <span className="mx-2 text-foreground/25">·</span>
          <span className="font-medium text-foreground/80">Open to relocation</span>
        </p>
        <p className="text-[14px] leading-relaxed text-foreground/70">
          {HERO_ROLES.map((role, i) => (
            <React.Fragment key={role}>
              {i > 0 && <span className="mx-2 text-foreground/25">·</span>}
              <span className="font-medium text-foreground/90">{role}</span>
            </React.Fragment>
          ))}
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={6}
        className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        <Magnetic strength={0.1}>
          <Button asChild size="lg" className="rounded-md">
            <Link href="#overview">
              Read overview
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Link
          href="#contact"
          className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground/60 transition-colors hover:text-foreground"
        >
          Contact me
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
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
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 8px), calc((${mouseY} - 0.5) * 6px), 0)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.4) 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.4) 85%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-15" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -top-24 left-[50%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.1),transparent_72%)] blur-3xl"
          style={{ transform: layer1 }}
        />
      </motion.div>
    </div>
  );
}
