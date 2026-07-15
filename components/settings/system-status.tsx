"use client";

import { motion } from "framer-motion";
import {
  Server,
  Database,
  Radio,
  Activity,
  Brain,
  Tag,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { SystemStatusData } from "@/types/settings";

interface SystemStatusProps {
  data: SystemStatusData;
}

const statusIcon = (s: string) => {
  if (s === "connected" || s === "healthy") return CheckCircle2;
  if (s === "degraded") return AlertTriangle;
  return XCircle;
};

const statusColor = (s: string) => {
  if (s === "connected" || s === "healthy") return "text-emerald-400";
  if (s === "degraded") return "text-amber-400";
  return "text-red-400";
};

const statusBg = (s: string) => {
  if (s === "connected" || s === "healthy") return "bg-emerald-500/10";
  if (s === "degraded") return "bg-amber-500/10";
  return "bg-red-500/10";
};

const statusLabel = (s: string) => {
  if (s === "connected") return "Connected";
  if (s === "disconnected") return "Disconnected";
  if (s === "healthy") return "Healthy";
  if (s === "degraded") return "Degraded";
  if (s === "down") return "Down";
  return s;
};

export default function SystemStatus({ data }: SystemStatusProps) {
  const items = [
    { label: "Gemini API", value: data.geminiApi, icon: Server },
    { label: "Database", value: data.database, icon: Database },
    { label: "Sensors", value: `${data.sensorsOnline} Online`, icon: Radio },
    { label: "Server Status", value: data.serverStatus, icon: Activity },
    { label: "AI Confidence", value: `${data.aiConfidence}%`, icon: Brain },
    { label: "Application Version", value: data.appVersion, icon: Tag },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">SYSTEM STATUS</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Infrastructure Health</h2>
        </div>
        <Activity className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isStatusChip = typeof item.value === "string" &&
            ["connected", "disconnected", "error", "healthy", "degraded", "down"].includes(item.value);
          const StatusIcon = isStatusChip ? statusIcon(item.value) : null;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-500/30"
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-slate-400" />
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
              </div>

              {isStatusChip && StatusIcon ? (
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusBg(item.value)} ${statusColor(item.value)}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusLabel(item.value)}
                  </span>
                </div>
              ) : (
                <p className="text-lg font-semibold text-white">{item.value}</p>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
