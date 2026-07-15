"use client";

import { useRef, useState, useEffect } from "react";
import { SendHorizontal, Mic, Paperclip } from "lucide-react";
import FileUpload from "./file-upload";
import { UploadedFile } from "@/types/chat";

interface ChatInputAreaProps {
  onSend: (message: string, files: UploadedFile[]) => void;
  isLoading?: boolean;
}

export default function ChatInputArea({ onSend, isLoading = false }: ChatInputAreaProps) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed && files.length === 0) return;
    if (isLoading) return;

    onSend(trimmed || "Analyze uploaded files", files);
    setMessage("");
    setFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900/70 px-5 py-4">
      <div className="mx-auto max-w-4xl space-y-3">
        <FileUpload files={files} onFilesChange={setFiles} />

        <div className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 transition focus-within:border-cyan-500/60 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.08)]">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
            title="Attach File"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Sentinel AI anything about your plant..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none bg-transparent py-1 text-sm text-white placeholder:text-slate-500 outline-none disabled:opacity-50"
          />

          <div className="flex items-center gap-1">
            <button
              className="cursor-not-allowed rounded-lg p-2 text-slate-600 transition"
              disabled
              title="Coming Soon"
            >
              <Mic className="h-5 w-5" />
            </button>

            <button
              onClick={handleSend}
              disabled={(!message.trim() && files.length === 0) || isLoading}
              className="rounded-xl bg-cyan-500 p-[11px] text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] text-slate-600">
            {message.length} / 4000
          </span>
          <span className="text-[10px] text-slate-600">
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
}
