"use client";

import { motion } from "framer-motion";
import { Factory, Hash, Clock, Radio, MapPin } from "lucide-react";
import { Select } from "@/components/ui/select";
import {
  PlantConfigData,
  Timezone,
  TimezoneLabels,
  SensorRefreshRate,
  SensorRefreshLabels,
  DefaultZone,
  DefaultZoneLabels,
} from "@/types/settings";

interface PlantConfigProps {
  data: PlantConfigData;
  onUpdate: (data: PlantConfigData) => void;
}

const tzOptions = (Object.keys(TimezoneLabels) as Timezone[]).map((k) => ({ value: k, label: TimezoneLabels[k] }));
const refreshOptions = (Object.keys(SensorRefreshLabels) as SensorRefreshRate[]).map((k) => ({ value: k, label: SensorRefreshLabels[k] }));
const zoneOptions = (Object.keys(DefaultZoneLabels) as DefaultZone[]).map((k) => ({ value: k, label: DefaultZoneLabels[k] }));

export default function PlantConfig({ data, onUpdate }: PlantConfigProps) {
  const set = <K extends keyof PlantConfigData>(key: K, val: PlantConfigData[K]) =>
    onUpdate({ ...data, [key]: val });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">PLANT CONFIGURATION</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Plant Settings</h2>
        </div>
        <Factory className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-6">
        <SettingRow label="Factory Name" icon={Factory}>
          <input
            value={data.factoryName}
            onChange={(e) => set("factoryName", e.target.value)}
            className="h-10 w-full max-w-xs rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40"
          />
        </SettingRow>

        <SettingRow label="Plant ID" icon={Hash}>
          <p className="rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2.5 text-sm font-mono text-slate-400">
            {data.plantId}
          </p>
        </SettingRow>

        <SettingRow label="Timezone" icon={Clock}>
          <Select options={tzOptions} value={data.timezone} onChange={(v) => set("timezone", v)} className="w-full max-w-xs" />
        </SettingRow>

        <SettingRow label="Sensor Refresh Rate" icon={Radio}>
          <Select options={refreshOptions} value={data.sensorRefreshRate} onChange={(v) => set("sensorRefreshRate", v)} className="w-full max-w-xs" />
        </SettingRow>

        <SettingRow label="Default Zone" icon={MapPin}>
          <Select options={zoneOptions} value={data.defaultZone} onChange={(v) => set("defaultZone", v)} className="w-full max-w-xs" />
        </SettingRow>
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
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-slate-400" />
        <span className="text-sm font-medium text-slate-200">{label}</span>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
