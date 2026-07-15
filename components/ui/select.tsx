"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function Select<T extends string = string>({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-slate-950/60 px-4 pr-10 text-sm text-white outline-none transition-colors",
          "hover:border-slate-600",
          "focus-visible:border-cyan-500 focus-visible:ring-1 focus-visible:ring-cyan-500/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export { Select };
export type { SelectProps, SelectOption };
