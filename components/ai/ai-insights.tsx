"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Factory,
  Radio,
  Activity,
  AlertTriangle,
  FileText,
  ClipboardCheck,
  Camera,
  Heart,
} from "lucide-react";
import { usePlant } from "@/context/plant-context";

interface AIInsightsProps {
  onQuickAction?: (action: string) => void;
}

export default function AIInsights({ onQuickAction }: AIInsightsProps) {
  const { aiConfidence, sensorOnline, alerts } = usePlant();

  const metrics = [
    { label: "Current AI Model", value: "Gemini 2.5 Flash", icon: Brain, color: "text-cyan-400" },
    { label: "Plant", value: "Sentinel Industrial Complex", icon: Factory, color: "text-blue-400" },
    { label: "Active Sensors", value: sensorOnline, icon: Radio, color: "text-emerald-400" },
    { label: "AI Confidence", value: `${aiConfidence}%`, icon: Activity, color: "text-cyan-400" },
    { label: "Today's Alerts", value: alerts.length, icon: AlertTriangle, color: "text-amber-400" },
  ];

  const quickActions = [
    { id: "daily-report", label: "Generate Daily Report", icon: FileText, description: "AI analyzes today's plant data" },
    { id: "checklist", label: "Create Safety Checklist", icon: ClipboardCheck, description: "Generate compliance checklist" },
    { id: "camera", label: "Analyze Camera Feed", icon: Camera, description: "AI reviews surveillance footage" },
    { id: "health", label: "View Plant Health", icon: Heart, description: "Real-time health dashboard" },
  ];

  return (
    <aside className="flex h-full w-80 flex-col border-l border-slate-800 bg-slate-950/60">
      <div className="border-b border-slate-800 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">AI INSIGHTS</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Live Analysis</h2>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950">
                  <Icon className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{metric.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="pt-2">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Quick Actions</p>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onQuickAction?.(action.label)}
                  className="group flex w-full items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-left transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200">{action.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{action.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
