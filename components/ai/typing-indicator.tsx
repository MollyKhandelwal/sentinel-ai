"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex gap-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 ring-1 ring-cyan-500/20">
        <Bot className="h-5 w-5 text-cyan-400" />
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 shadow-lg">
        <div className="mb-2 text-sm font-semibold text-emerald-400">
          Sentinel AI
        </div>

        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: 0.15 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
