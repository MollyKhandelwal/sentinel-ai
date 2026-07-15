"use client";

import { motion } from "framer-motion";
import { MessageSquare, Pin } from "lucide-react";
import { Conversation, formatTimestamp } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  onPin?: () => void;
  onDelete?: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
  onPin,
}: ConversationItemProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-xl border p-3.5 text-left transition-all duration-200",
        isActive
          ? "border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
          : "border-slate-800 bg-slate-900/70 hover:border-cyan-500/30 hover:bg-slate-900",
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isActive ? "bg-cyan-500/20" : "bg-slate-800",
        )}>
          <MessageSquare className={cn("h-4 w-4", isActive ? "text-cyan-400" : "text-slate-400")} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-white">
              {conversation.title}
            </h3>
            {conversation.isPinned && (
              <Pin className="h-3 w-3 shrink-0 text-cyan-400" />
            )}
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">
            {conversation.lastMessage}
          </p>
        </div>

        <span className="shrink-0 text-[10px] text-slate-600">
          {formatTimestamp(conversation.timestamp)}
        </span>
      </div>
    </motion.button>
  );
}
