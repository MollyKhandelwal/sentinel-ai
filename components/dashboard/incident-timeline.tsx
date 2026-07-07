"use client";

import {
  CheckCircle2,
  TriangleAlert,
  Bot,
  Thermometer,
} from "lucide-react";

const timeline = [
  {
    id: 1,
    time: "10:42 AM",
    title: "Sensor Restored",
    description: "Sensor S-24 resumed normal operation.",
    location: "Warehouse Zone",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500",
  },
  {
    id: 2,
    time: "10:37 AM",
    title: "Temperature Threshold Exceeded",
    description: "Temperature crossed the safety threshold.",
    location: "Assembly Line 4",
    icon: Thermometer,
    color: "text-amber-400",
    bg: "bg-amber-500",
  },
  {
    id: 3,
    time: "10:31 AM",
    title: "Gas Leak Detected",
    description: "Methane concentration increased rapidly.",
    location: "Boiler Zone B",
    icon: TriangleAlert,
    color: "text-red-400",
    bg: "bg-red-500",
  },
  {
    id: 4,
    time: "10:25 AM",
    title: "AI Shutdown Recommendation",
    description: "AI advised immediate shutdown for safety.",
    location: "Boiler Zone B",
    icon: Bot,
    color: "text-cyan-400",
    bg: "bg-cyan-500",
  },
];

export default function IncidentTimeline() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      {/* Header */}
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
          Incident Timeline
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-400">
          Chronological view of plant events detected by Sentinel AI.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative ml-4 border-l border-slate-700">

        {timeline.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="relative mb-8 ml-6"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[38px] flex h-10 w-10 items-center justify-center rounded-full ${item.bg}`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all duration-300 hover:border-cyan-500/40">

                <div className="flex items-center justify-between">

                  <h3 className={`font-semibold ${item.color}`}>
                    {item.title}
                  </h3>

                  <span className="text-xs text-slate-500">
                    {item.time}
                  </span>

                </div>

                <p className="mt-3 text-sm text-slate-300">
                  {item.description}
                </p>

                <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
                  {item.location}
                </p>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}