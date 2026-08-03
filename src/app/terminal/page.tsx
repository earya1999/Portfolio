import type { Metadata } from "next";
import { Terminal } from "@/components/terminal";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Interactive terminal view of Eshaan Arya's portfolio.",
};

export default function TerminalPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <div className="eyebrow">Easter egg</div>
            <h1 className="heading mt-2 text-3xl font-semibold sm:text-4xl">
              A tiny terminal.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">
              Type <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">help</code> to see the commands. Try
              <code className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">whoami</code>,
              <code className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ls projects</code>, or
              <code className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">contact</code>.
            </p>
          </div>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
