"use client";

import { Bot, ArrowRight, Sparkles } from "lucide-react";

const recommendations = [
  {
    title: "Inspect Boiler Zone B",
    description:
      "AI detected an abnormal increase in methane concentration. Immediate inspection is recommended.",
    priority: "High",
  },
  {
    title: "Schedule Sensor Calibration",
    description:
      "Temperature Sensor T-14 is drifting beyond acceptable tolerance limits.",
    priority: "Medium",
  },
  {
    title: "Reduce Conveyor Speed",
    description:
      "Lowering conveyor speed by 10% can reduce vibration risk in Assembly Line 4.",
    priority: "Low",
  },
];

export default function AIRecommendation() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            AI Copilot
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Smart Recommendations
          </h2>
        </div>

        <Bot className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-4">
        {recommendations.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                {item.priority}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {item.description}
            </p>

            <button className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300">
              View Details
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <Sparkles className="h-5 w-5 text-cyan-400" />

        <p className="text-sm text-cyan-300">
          AI Confidence: <strong>97.4%</strong> based on live sensor analysis.
        </p>
      </div>
    </div>
  );
}