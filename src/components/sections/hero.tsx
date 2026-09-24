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
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.04 * i, ease },
  }),
};

const HERO_ROLES = profile.targetRoles.slice(0, 3);

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
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-20 pb-20 sm:pt-24 sm:pb-24"
    >
      <HeroBackground mouseX={springX} mouseY={springY} />

      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 sm:px-8 lg:pl-16 xl:pl-10">
        <div className="grid items-start gap-0 lg:grid-cols-[minmax(0,17rem)_1px_minmax(0,1fr)]">
          <Portrait />
          <div
            aria-hidden
            className="hidden bg-border/80 lg:block"
          />
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
      className="flex justify-center lg:justify-start lg:pr-10"
    >
      <div className="relative aspect-[3/4] w-[15rem] overflow-hidden rounded-md border border-border sm:w-[16rem] lg:w-[16.5rem]">
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
              sizes="264px"
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
      className="mt-9 flex flex-col text-center lg:mt-0 lg:pl-10 lg:pt-0 lg:text-left"
    >
      <motion.h1
        variants={fadeUp}
        custom={2}
        className="font-display text-[2.65rem] font-medium leading-[0.96] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.5rem]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={3}
        className="mt-3 text-[15px] font-semibold tracking-[0.06em] text-foreground/70 sm:text-[16px]"
      >
        {profile.role}
      </motion.p>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mx-auto mt-5 max-w-md text-[1.05rem] leading-[1.5] text-balance text-foreground/80 sm:text-[1.15rem] lg:mx-0 lg:max-w-lg"
      >
        Turning complex{" "}
        <span className="font-medium text-foreground">enterprise</span>{" "}
        workflows into solutions customers{" "}
        <span className="font-medium text-foreground">actually</span> use.
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
        <Magnetic strength={0.06}>
          <Button asChild size="lg" className="rounded-sm px-6">
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

function HeroBackground({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 4px), calc((${mouseY} - 0.5) * 3px), 0)`;

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
      <div className="absolute inset-0 grid-bg opacity-[0.06] dark:opacity-[0.04]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute top-[-12%] left-[46%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(closest-side,rgba(15,23,42,0.04),transparent_72%)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.035),transparent_72%)]"
          style={{ transform: layer1 }}
        />
      </motion.div>
    </div>
  );
}
