"use client";

import { motion } from "framer-motion";
import { Wifi, Cpu, Zap, Clock } from "lucide-react";

interface StatusBarProps {
  geminiModel: string;
  tokenUsage: string;
  latency: string;
  isConnected: boolean;
}

export default function StatusBar({ geminiModel, tokenUsage, latency, isConnected }: StatusBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-xs"
    >
      <div className="flex items-center gap-2">
        <span className={`flex h-2 w-2 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
        <span className="font-medium text-slate-400">{isConnected ? "Connected" : "Disconnected"}</span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-slate-500">{geminiModel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-slate-500">Tokens: {tokenUsage}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-slate-500">Latency: {latency}</span>
        </div>
      </div>
    </motion.div>
  );
}
