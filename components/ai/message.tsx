"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage, formatTimestamp } from "@/types/chat";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: ChatMessage;
  onCopy: (content: string) => void;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onRegenerate?: (id: string) => void;
}

export default function Message({ message, onCopy, onLike, onDislike, onRegenerate }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    onCopy(message.content);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 ring-1 ring-cyan-500/20">
          <Bot className="h-5 w-5 text-cyan-400" />
        </div>
      )}

      <div className={cn("group relative max-w-[78%] min-w-0")}>
        <div
          className={cn(
            "rounded-2xl border p-5 shadow-lg transition-all break-words",
            isUser
              ? "border-cyan-500/30 bg-cyan-500/10"
              : "border-slate-700 bg-slate-900/90",
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className={cn("text-sm font-semibold", isUser ? "text-cyan-300" : "text-emerald-400")}>
              {isUser ? "You" : "Sentinel AI"}
            </span>
            {!isUser && (
              <button
                onClick={handleCopy}
                className="rounded-lg p-1 opacity-0 transition-all hover:bg-slate-800 group-hover:opacity-100"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-slate-400 hover:text-white" />
                )}
              </button>
            )}
          </div>

          {isUser ? (
            <div className="whitespace-pre-wrap leading-7 text-slate-100">
              {message.content}
            </div>
          ) : (
            <div
              className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-slate-200 prose-p:leading-7 prose-strong:text-cyan-300 prose-li:text-slate-200 prose-code:text-cyan-300 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-300 prose-a:text-cyan-400 prose-table:border-slate-700 prose-th:text-slate-300 prose-td:text-slate-400"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-3 px-1">
          <span className="text-[11px] text-slate-600">{formatTimestamp(message.timestamp)}</span>
          {!isUser && (
            <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onLike?.(message.id)}
                className={cn("rounded p-1 transition", message.liked ? "text-cyan-400" : "text-slate-600 hover:text-cyan-400")}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDislike?.(message.id)}
                className={cn("rounded p-1 transition", message.disliked ? "text-red-400" : "text-slate-600 hover:text-red-400")}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onRegenerate?.(message.id)}
                className="rounded p-1 text-slate-600 transition hover:text-cyan-400"
                title="Regenerate response"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-500/20">
          <User className="h-5 w-5 text-blue-400" />
        </div>
      )}
    </motion.div>
  );
}

