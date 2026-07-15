"use client";

import { motion } from "framer-motion";
import { Lock, KeyRound, ShieldCheck, Clock, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import {
  SecuritySettingsData,
  SessionTimeout,
  SessionTimeoutLabels,
} from "@/types/settings";

interface SecuritySettingsProps {
  data: SecuritySettingsData;
  onUpdate: (data: SecuritySettingsData) => void;
}

const timeoutOptions = (Object.keys(SessionTimeoutLabels) as SessionTimeout[]).map((k) => ({
  value: k,
  label: SessionTimeoutLabels[k],
}));

export default function SecuritySettings({ data, onUpdate }: SecuritySettingsProps) {
  const set = <K extends keyof SecuritySettingsData>(key: K, val: SecuritySettingsData[K]) =>
    onUpdate({ ...data, [key]: val });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">SECURITY</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Account Security</h2>
        </div>
        <Lock className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-6">
        <SettingRow label="Current Password" icon={Lock}>
          <input
            type="password"
            value={data.currentPassword}
            onChange={(e) => set("currentPassword", e.target.value)}
            placeholder="••••••••"
            className="h-10 w-full max-w-xs rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 placeholder:text-slate-600"
          />
        </SettingRow>

        <SettingRow label="New Password" icon={KeyRound}>
          <input
            type="password"
            value={data.newPassword}
            onChange={(e) => set("newPassword", e.target.value)}
            placeholder="••••••••"
            className="h-10 w-full max-w-xs rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 placeholder:text-slate-600"
          />
        </SettingRow>

        <SettingRow label="Confirm Password" icon={KeyRound}>
          <input
            type="password"
            value={data.confirmPassword}
            onChange={(e) => set("confirmPassword", e.target.value)}
            placeholder="••••••••"
            className="h-10 w-full max-w-xs rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 placeholder:text-slate-600"
          />
        </SettingRow>

        <SettingRow label="Two-Factor Authentication" icon={ShieldCheck}>
          <Switch checked={data.twoFactorEnabled} onCheckedChange={(v) => set("twoFactorEnabled", v)} />
        </SettingRow>

        <SettingRow label="Session Timeout" icon={Clock}>
          <Select options={timeoutOptions} value={data.sessionTimeout} onChange={(v) => set("sessionTimeout", v)} className="w-full max-w-xs" />
        </SettingRow>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20">
            <LogOut className="h-4 w-4" />
            Logout from All Devices
          </button>
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
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-slate-400" />
        <span className="text-sm font-medium text-slate-200">{label}</span>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
