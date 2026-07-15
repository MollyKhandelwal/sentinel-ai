"use client";

import { motion } from "framer-motion";
import { Brain, Zap, ShieldAlert, Eye, Bot } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select } from "@/components/ui/select";
import { AISettingsData, AIModelLabels, AIModel } from "@/types/settings";

interface AISettingsProps {
  data: AISettingsData;
  onUpdate: (data: AISettingsData) => void;
}

const modelOptions = (Object.keys(AIModelLabels) as AIModel[]).map((k) => ({
  value: k,
  label: AIModelLabels[k],
}));

export default function AISettings({ data, onUpdate }: AISettingsProps) {
  const set = <K extends keyof AISettingsData>(key: K, val: AISettingsData[K]) =>
    onUpdate({ ...data, [key]: val });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">AI SETTINGS</p>
          <h2 className="mt-2 text-2xl font-bold text-white">AI Configuration</h2>
        </div>
        <Brain className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-6">
        <SettingRow label="AI Model" icon={Bot}>
          <Select options={modelOptions} value={data.model} onChange={(v) => set("model", v)} className="w-full max-w-xs" />
        </SettingRow>

        <SettingRow label="Confidence Threshold" icon={Zap}>
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-center justify-between">
              <Slider value={data.confidenceThreshold} min={50} max={100} step={1} onChange={(v) => set("confidenceThreshold", v)} />
              <span className="ml-4 min-w-[3rem] text-right text-sm font-semibold text-cyan-400">{data.confidenceThreshold}%</span>
            </div>
          </div>
        </SettingRow>

        <SettingRow label="Auto Recommendations" icon={Bot}>
          <Switch checked={data.autoRecommendations} onCheckedChange={(v) => set("autoRecommendations", v)} />
        </SettingRow>

        <SettingRow label="Auto Incident Detection" icon={ShieldAlert}>
          <Switch checked={data.autoIncidentDetection} onCheckedChange={(v) => set("autoIncidentDetection", v)} />
        </SettingRow>

        <SettingRow label="Auto Shutdown Recommendation" icon={ShieldAlert}>
          <Switch checked={data.autoShutdownRecommendation} onCheckedChange={(v) => set("autoShutdownRecommendation", v)} />
        </SettingRow>

        <SettingRow label="Show AI Reasoning" icon={Eye}>
          <Switch checked={data.showAIReasoning} onCheckedChange={(v) => set("showAIReasoning", v)} />
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
