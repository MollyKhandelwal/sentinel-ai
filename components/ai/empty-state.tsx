"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const suggestions = [
  "Show critical zones in my plant",
  "Analyze methane levels in Boiler Zone B",
  "Generate a safety compliance report",
  "What's the current plant health score?",
];

export default function EmptyState({ onPromptClick }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 blur-xl"
        />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
          <Bot className="h-12 w-12 text-cyan-400" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white"
      >
        How can Sentinel AI assist today?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 max-w-lg text-center text-sm leading-relaxed text-slate-400"
      >
        Ask about sensor data, plant operations, safety incidents, or request AI-powered recommendations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-2"
      >
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onPromptClick(s)}
            className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-xs text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-400"
          >
            {s}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-4 py-2"
      >
        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
        <span className="text-xs text-slate-500">
          Powered by Gemini 2.5 Flash • Real-time industrial AI
        </span>
      </motion.div>
    </div>
  );
}
