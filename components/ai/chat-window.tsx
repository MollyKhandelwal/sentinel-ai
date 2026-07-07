"use client";

import { useEffect, useRef } from "react";

import Message from "./message";
import { ChatMessage } from "@/app/(dashboard)/ai-copilot/page";

interface ChatWindowProps {
  messages: ChatMessage[];
}

export default function ChatWindow({
  messages,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="rounded-t-2xl bg-slate-900/70">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-6">

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Live Conversation
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Sentinel AI Assistant
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>

          <span className="text-xs font-semibold text-emerald-400">
            Online
          </span>
        </div>

      </div>

      {/* Chat */}
      <div className="h-[520px] overflow-y-auto p-6">

        <div className="space-y-5">

          {messages.map((msg, index) => (
            <Message
              key={index}
              role={msg.role}
              message={msg.message}
            />
          ))}

          <div ref={bottomRef} />

        </div>

      </div>

    </div>
  );
}