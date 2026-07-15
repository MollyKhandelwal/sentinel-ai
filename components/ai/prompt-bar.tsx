"use client";

interface PromptBarProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "Explain methane leak",
  "Generate plant report",
  "Predict equipment failure",
  "Show critical alerts",
  "Sensor health summary",
  "Should Boiler Zone B shutdown?",
];

export default function PromptBar({
  onSelect,
}: PromptBarProps) {
  return (
    <div className="border-t border-slate-800 bg-slate-950/70 p-4">

      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">
        Suggested Prompts
      </p>

      <div className="flex flex-wrap gap-3">

        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
          >
            {prompt}
          </button>
        ))}

      </div>

    </div>
  );
}