"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Search, Pin, Clock } from "lucide-react";
import ConversationItem from "./conversation-item";
import type { Conversation } from "@/types/chat";

interface ChatSidebarProps {
  conversations?: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onPinConversation?: (id: string) => void;
}

export default function ChatSidebar({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onPinConversation,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const safeConversations = conversations ?? [];

    if (!search.trim()) return safeConversations;

    const q = search.toLowerCase();

    return safeConversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [conversations, search]);

  const pinned = (filtered ?? []).filter((c) => c.isPinned);
  const recent = (filtered ?? []).filter((c) => !c.isPinned);

  return (
    <aside className="flex h-full w-80 flex-col border-r border-slate-800 bg-slate-950/60">
      {/* New Chat Button */}
      <div className="border-b border-slate-800 p-4">
        <button
          onClick={onNewConversation}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          <Plus className="h-5 w-5" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 transition focus-within:border-cyan-500/60">
          <Search className="h-4 w-4 shrink-0 text-slate-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 space-y-5 overflow-y-auto p-3">
        {/* Pinned */}
        {pinned.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-1.5 px-2">
              <Pin className="h-3 w-3 text-cyan-400" />
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">
                Pinned
              </span>
            </div>

            <div className="space-y-1.5">
              <AnimatePresence>
                {pinned.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={conv.id === activeConversationId}
                    onClick={() => onSelectConversation(conv.id)}
                    onPin={() => onPinConversation?.(conv.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Recent */}
        <div>
          <div className="mb-2 flex items-center gap-1.5 px-2">
            <Clock className="h-3 w-3 text-slate-500" />
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">
              Recent
            </span>
          </div>

          {recent.length === 0 ? (
            <p className="px-2 py-6 text-center text-xs text-slate-600">
              {search
                ? "No conversations found"
                : "No recent conversations"}
            </p>
          ) : (
            <div className="space-y-1.5">
              <AnimatePresence>
                {recent.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={conv.id === activeConversationId}
                    onClick={() => onSelectConversation(conv.id)}
                    onPin={() => onPinConversation?.(conv.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}