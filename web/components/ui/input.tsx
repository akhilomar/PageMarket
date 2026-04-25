import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
      {label ? <span>{label}</span> : null}
      <input
        className={cn(
          "rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-ink/40 focus:border-coral",
          className
        )}
        {...props}
      />
    </label>
  );
}

