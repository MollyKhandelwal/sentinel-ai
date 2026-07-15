"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

import ProfileCard from "@/components/settings/profile-card";
import AISettings from "@/components/settings/ai-settings";
import PlantConfig from "@/components/settings/plant-config";
import NotificationSettings from "@/components/settings/notification-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";
import SecuritySettings from "@/components/settings/security-settings";
import SystemStatus from "@/components/settings/system-status";

import type {
  ProfileSettings,
  AISettingsData,
  PlantConfigData,
  NotificationSettingsData,
  AppearanceSettingsData,
  SecuritySettingsData,
  SystemStatusData,
} from "@/types/settings";
import {
  DEFAULT_PROFILE,
  DEFAULT_AI,
  DEFAULT_PLANT,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_APPEARANCE,
  DEFAULT_SECURITY,
  DEFAULT_SYSTEM,
} from "@/types/settings";

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileSettings>(DEFAULT_PROFILE);
  const [ai, setAI] = useState<AISettingsData>(DEFAULT_AI);
  const [plant, setPlant] = useState<PlantConfigData>(DEFAULT_PLANT);
  const [notifications, setNotifications] = useState<NotificationSettingsData>(DEFAULT_NOTIFICATIONS);
  const [appearance, setAppearance] = useState<AppearanceSettingsData>(DEFAULT_APPEARANCE);
  const [security, setSecurity] = useState<SecuritySettingsData>(DEFAULT_SECURITY);
  const [system] = useState<SystemStatusData>(DEFAULT_SYSTEM);

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    setAI(DEFAULT_AI);
    setPlant(DEFAULT_PLANT);
    setNotifications(DEFAULT_NOTIFICATIONS);
    setAppearance(DEFAULT_APPEARANCE);
    setSecurity(DEFAULT_SECURITY);

    toast("Settings Reset", {
      description: "All settings have been restored to their default values.",
      duration: 3000,
      style: {
        background: "#0f172a",
        border: "1px solid #334155",
        color: "#e2e8f0",
      },
    });
  };

  const handleSave = () => {
    // Future: POST to /api/settings
    console.log("Saving settings:", {
      profile,
      ai,
      plant,
      notifications,
      appearance,
      security,
    });

    toast.success("Settings Saved", {
      description: "Your Sentinel AI preferences have been updated successfully.",
      duration: 3000,
      style: {
        background: "#0f172a",
        border: "1px solid #334155",
        color: "#e2e8f0",
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          SETTINGS
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure Sentinel AI preferences, plant settings and security.
        </p>
      </motion.section>

      {/* Profile */}
      <ProfileCard data={profile} onUpdate={setProfile} />

      {/* Settings Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <AISettings data={ai} onUpdate={setAI} />
        <PlantConfig data={plant} onUpdate={setPlant} />
        <NotificationSettings data={notifications} onUpdate={setNotifications} />
        <AppearanceSettings data={appearance} onUpdate={setAppearance} />
        <SecuritySettings data={security} onUpdate={setSecurity} />
        <SystemStatus data={system} />
      </div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
        className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl sm:flex-row sm:justify-end"
      >
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Changes
        </button>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </motion.div>
    </div>
  );
}
