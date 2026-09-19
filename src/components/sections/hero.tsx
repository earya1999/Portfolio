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
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.05 * i, ease },
  }),
};

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

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        {/* One composition: photo + copy share a vertical center */}
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] lg:gap-12 xl:gap-14">
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
      className="order-1 mx-auto w-full max-w-[14.5rem] sm:max-w-[15.5rem] lg:mx-0 lg:max-w-none"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.15rem]">
        {avatarOk ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease }}
            className="absolute inset-0"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 248px, 232px"
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.15rem] ring-1 ring-inset ring-white/[0.08]"
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
      className="order-2 flex flex-col"
    >
      <motion.h1
        variants={fadeUp}
        custom={2}
        className="font-display text-[2.5rem] font-medium leading-[0.98] tracking-tight text-foreground sm:text-[3.15rem] lg:text-[3.5rem]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={3}
        className="mt-2.5 text-[15px] font-medium tracking-wide text-sky-200/85 sm:text-base"
      >
        {profile.role}
      </motion.p>

      <motion.p
        variants={fadeUp}
        custom={4}
        className="mt-5 max-w-lg text-[1.05rem] leading-[1.55] text-foreground/55 text-pretty sm:text-[1.125rem]"
      >
        Turning complex enterprise workflows into solutions customers actually
        use.
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="mt-6 flex flex-col gap-1.5 border-l border-white/[0.12] pl-4"
      >
        <p className="text-[13px] leading-snug text-foreground/55">
          <span className="text-foreground/80">Purdue University</span>
          <span className="mx-1.5 text-foreground/20">·</span>
          {profile.location}
          <span className="mx-1.5 text-foreground/20">·</span>
          Open to relocation
        </p>
        <p className="text-[13px] leading-snug text-foreground/80">
          {HERO_ROLES.join(" · ")}
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={6}
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
      >
        <Magnetic strength={0.08}>
          <Button asChild size="lg" className="rounded-md">
            <Link href="#overview">
              Read overview
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Link
          href="#contact"
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground/55 transition-colors hover:text-foreground"
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
  const layer1 = useMotionTemplate`translate3d(calc(-50% + (${mouseX} - 0.5) * 6px), calc((${mouseY} - 0.5) * 5px), 0)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.35) 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.35) 88%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -top-28 left-[46%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.09),transparent_72%)] blur-3xl"
          style={{ transform: layer1 }}
        />
      </motion.div>
    </div>
  );
}
