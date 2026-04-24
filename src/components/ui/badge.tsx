import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        green: "bg-primary-light text-primary",
        orange: "bg-accent-light text-accent",
        red: "bg-red-50 text-red-600",
        neutral: "bg-gray-100 text-text-secondary",
        dark: "bg-text-primary text-white",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
