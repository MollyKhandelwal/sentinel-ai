"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
  className,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 outline-none",
          "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(34,211,238,0.5)]",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(34,211,238,0.5)]",
          disabled && "cursor-not-allowed opacity-50",
        )}
        style={{
          background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${pct}%, #334155 ${pct}%, #334155 100%)`,
        }}
      />
    </div>
  );
}

export { Slider };
export type { SliderProps };
