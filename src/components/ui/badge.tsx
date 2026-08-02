import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary/60 text-foreground/80",
        outline: "border-border text-muted-foreground bg-transparent",
        solid: "border-transparent bg-foreground text-background",
        muted: "border-transparent bg-muted text-muted-foreground",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
        info: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
