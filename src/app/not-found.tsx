import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative">
        <div className="eyebrow">404 · Not found</div>
        <h1 className="mt-3 font-display text-6xl font-semibold tracking-tight text-balance sm:text-8xl">
          Page went <span className="gradient-text">missing.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground text-pretty">
          The page you&apos;re looking for either got refactored, deprecated, or was never
          there. Happens to the best of us.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home />
              Back home
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/#experience">
              <ArrowLeft />
              See experience
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/terminal">
              <Search />
              Try the terminal
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
