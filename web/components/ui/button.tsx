import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-coral text-white hover:opacity-90",
        variant === "secondary" && "bg-ink text-white hover:opacity-90",
        variant === "ghost" && "border border-ink/10 bg-white text-ink hover:bg-sand",
        className
      )}
      {...props}
    />
  );
}

