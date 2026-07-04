import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  variant: "blue" | "green" | "red" | "cyan";
}

const variants = {
  blue: "bg-blue-600",
  green: "bg-emerald-600",
  red: "bg-red-600",
  cyan: "bg-cyan-600",
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
}: KPICardProps) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${variants[variant]}`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );
}