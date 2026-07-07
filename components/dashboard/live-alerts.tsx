"use client";

import {
  TriangleAlert,
  Thermometer,
  CheckCircle2,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Gas Leakage Detected",
    location: "Boiler Zone B",
    time: "2 min ago",
    status: "Critical",
    color: "bg-red-500/10 text-red-400 border-red-500/30",
    icon: TriangleAlert,
  },
  {
    id: 2,
    title: "Temperature Spike",
    location: "Assembly Line 4",
    time: "8 min ago",
    status: "Warning",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Thermometer,
  },
  {
    id: 3,
    title: "Sensor Restored",
    location: "Storage Unit",
    time: "12 min ago",
    status: "Resolved",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: CheckCircle2,
  },
];

export default function LiveAlerts() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
            Live Alerts
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Incident Feed
          </h2>
        </div>

        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          3 Active
        </span>
      </div>

      <div className="space-y-4">

        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.id}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900"
            >
              <div className="flex items-start gap-3">

                <div className={`rounded-lg p-2 ${alert.color}`}>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-white">
                      {alert.title}
                    </h3>

                    <span
                      className={`rounded-full border px-2 py-1 text-xs ${alert.color}`}
                    >
                      {alert.status}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {alert.location}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {alert.time}
                  </p>

                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}