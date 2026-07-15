"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { QuickPrompt } from "@/types/chat";

interface QuickPromptCardProps {
  prompt: QuickPrompt;
  onClick: (prompt: QuickPrompt) => void;
  index: number;
}

export default function QuickPromptCard({ prompt, onClick, index }: QuickPromptCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      onClick={() => onClick(prompt)}
      className="group flex flex-col items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
    >
      <span className="text-2xl">{prompt.icon}</span>
      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
        {prompt.title}
      </h3>
      <p className="text-xs leading-relaxed text-slate-500">
        {prompt.description}
      </p>
      <div className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-cyan-500 opacity-0 transition-opacity group-hover:opacity-100">
        <span>Try this</span>
        <ArrowRight className="h-3 w-3" />
      </div>
    </motion.button>
  );
}
