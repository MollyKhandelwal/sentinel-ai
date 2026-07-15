"use client";

import { useState } from "react";
import {
  SendHorizontal,
  Mic,
  Paperclip,
} from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const quickPrompts = [
  "Show critical zones",
  "Show sensor status",
  "Temperature report",
  "Should we shutdown Boiler Zone B?",
];

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function send(text?: string) {
    const finalMessage = (text ?? message).trim();

    if (!finalMessage) return;

    onSend(finalMessage);

    setMessage("");
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 transition focus-within:border-cyan-500">

        <button
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
          title="Attach File"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={message}
          placeholder="Ask Sentinel AI anything..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
        />

        <button
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
          title="Voice"
        >
          <Mic className="h-5 w-5" />
        </button>

        <button
          onClick={() => send()}
          disabled={!message.trim()}
          className="rounded-xl bg-cyan-500 p-3 text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>

      </div>

      <div className="mt-4">

        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-500">
          Suggested Prompts
        </p>

        <div className="flex flex-wrap gap-2">

          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
            >
              {prompt}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}