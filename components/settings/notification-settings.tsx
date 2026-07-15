"use client";

import { motion } from "framer-motion";
import { Bell, Mail, Smartphone, AlertTriangle, FileText, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { NotificationSettingsData } from "@/types/settings";

interface NotificationSettingsProps {
  data: NotificationSettingsData;
  onUpdate: (data: NotificationSettingsData) => void;
}

export default function NotificationSettings({ data, onUpdate }: NotificationSettingsProps) {
  const set = <K extends keyof NotificationSettingsData>(key: K, val: NotificationSettingsData[K]) =>
    onUpdate({ ...data, [key]: val });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">NOTIFICATIONS</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Alert Preferences</h2>
        </div>
        <Bell className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-4">
        <SettingRow label="Email Alerts" icon={Mail}>
          <Switch checked={data.emailAlerts} onCheckedChange={(v) => set("emailAlerts", v)} />
        </SettingRow>
        <SettingRow label="SMS Alerts" icon={Smartphone}>
          <Switch checked={data.smsAlerts} onCheckedChange={(v) => set("smsAlerts", v)} />
        </SettingRow>
        <SettingRow label="Push Notifications" icon={Bell}>
          <Switch checked={data.pushNotifications} onCheckedChange={(v) => set("pushNotifications", v)} />
        </SettingRow>
        <SettingRow label="Critical Alerts Only" icon={AlertTriangle}>
          <Switch checked={data.criticalAlertsOnly} onCheckedChange={(v) => set("criticalAlertsOnly", v)} />
        </SettingRow>
        <SettingRow label="Daily Reports" icon={FileText}>
          <Switch checked={data.dailyReports} onCheckedChange={(v) => set("dailyReports", v)} />
        </SettingRow>
        <SettingRow label="Weekly Reports" icon={Calendar}>
          <Switch checked={data.weeklyReports} onCheckedChange={(v) => set("weeklyReports", v)} />
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
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-slate-400" />
        <span className="text-sm font-medium text-slate-200">{label}</span>
      </div>
      {children}
    </div>
  );
}
