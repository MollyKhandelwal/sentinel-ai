"use client";

import { motion } from "framer-motion";
import { Palette, Moon, Layout, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  AppearanceSettingsData,
  AccentColor,
  AccentColorLabels,
  AccentColorValues,
} from "@/types/settings";

interface AppearanceSettingsProps {
  data: AppearanceSettingsData;
  onUpdate: (data: AppearanceSettingsData) => void;
}

const accentOptions: AccentColor[] = ["cyan", "blue", "emerald", "purple"];

export default function AppearanceSettings({ data, onUpdate }: AppearanceSettingsProps) {
  const set = <K extends keyof AppearanceSettingsData>(key: K, val: AppearanceSettingsData[K]) =>
    onUpdate({ ...data, [key]: val });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">APPEARANCE</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Display Settings</h2>
        </div>
        <Palette className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-6">
        <SettingRow label="Dark Mode" icon={Moon}>
          <Switch checked={data.darkMode} onCheckedChange={(v) => set("darkMode", v)} />
        </SettingRow>

        <SettingRow label="Compact Layout" icon={Layout}>
          <Switch checked={data.compactLayout} onCheckedChange={(v) => set("compactLayout", v)} />
        </SettingRow>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="mb-4 flex items-center gap-3">
            <Palette className="h-5 w-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-200">Accent Color</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {accentOptions.map((color) => (
              <button
                key={color}
                onClick={() => set("accentColor", color)}
                className="group flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 transition hover:border-slate-500"
              >
                <span
                  className="h-5 w-5 rounded-full border-2 border-slate-800 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: AccentColorValues[color] }}
                />
                <span className="text-sm text-slate-300">{AccentColorLabels[color]}</span>
                {data.accentColor === color && (
                  <Check className="ml-1 h-4 w-4 text-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SettingRow({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-slate-400" />
        <span className="text-sm font-medium text-slate-200">{label}</span>
      </div>
      {children}
    </div>
  );
}
