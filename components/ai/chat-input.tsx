"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    const text = message.trim();

    if (!text) return;

    onSend(text);

    setMessage("");
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3">

        <input
          type="text"
          value={message}
          placeholder="Ask Sentinel AI anything..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-xl bg-cyan-500 p-3 text-white transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>

      </div>

      <div className="mt-3 flex flex-wrap gap-2">

        <button
          onClick={() => onSend("Show critical zones")}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          Critical Zones
        </button>

        <button
          onClick={() => onSend("Show sensor status")}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          Sensor Status
        </button>

        <button
          onClick={() => onSend("Temperature report")}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          Temperature
        </button>

        <button
          onClick={() => onSend("Should we shutdown Boiler Zone B?")}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          Shutdown
        </button>

      </div>

    </div>
  );
}