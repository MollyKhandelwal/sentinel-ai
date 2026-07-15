"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download } from "lucide-react";
import Message from "./message";
import TypingIndicator from "./typing-indicator";
import EmptyState from "./empty-state";
import QuickPromptCard from "./quick-prompt-card";
import { ChatMessage, QuickPrompt, DEFAULT_QUICK_PROMPTS } from "@/types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onPromptClick: (prompt: string) => void;
  onQuickPromptClick: (prompt: QuickPrompt) => void;
  onCopy: (content: string) => void;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onRegenerate: (id: string) => void;
  onExport?: () => void;
}

export default function ChatWindow({
  messages,
  isTyping,
  onPromptClick,
  onQuickPromptClick,
  onCopy,
  onLike,
  onDislike,
  onRegenerate,
  onExport,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col min-h-0" ref={containerRef}>
      {/* Chat Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-4 backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">LIVE CONVERSATION</p>
          <h2 className="mt-1 text-lg font-bold text-white">Sentinel AI Assistant</h2>
          <p className="text-xs text-slate-500">Industrial Safety Copilot powered by Gemini AI</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Online</span>
          </div>

          {messages.length > 0 && onExport && (
            <button
              onClick={onExport}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
              title="Export conversation"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 w-full overflow-x-hidden">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center">
            <EmptyState onPromptClick={onPromptClick} />

            <div className="mt-auto w-full max-w-2xl px-6 pb-8">
              <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-slate-600">
                Quick Prompts
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {DEFAULT_QUICK_PROMPTS.map((prompt, i) => (
                  <QuickPromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onClick={onQuickPromptClick}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-5 px-6 py-8">
            <AnimatePresence>
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  message={msg}
                  onCopy={onCopy}
                  onLike={onLike}
                  onDislike={onDislike}
                  onRegenerate={onRegenerate}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}


