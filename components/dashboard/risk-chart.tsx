"use client";

import { Activity, ShieldCheck, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const riskData = [
  { day: "Mon", risk: 94 },
  { day: "Tue", risk: 91 },
  { day: "Wed", risk: 89 },
  { day: "Thu", risk: 92 },
  { day: "Fri", risk: 87 },
  { day: "Sat", risk: 90 },
  { day: "Sun", risk: 92 },
];

export default function RiskChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Risk Trend
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Industrial Safety Score
          </h2>

          <p className="mt-2 text-slate-400">
            Live AI risk monitoring across all active plant zones.
          </p>
        </div>

        <div className="rounded-xl bg-cyan-500/10 p-4">
          <Activity className="h-8 w-8 text-cyan-400" />
        </div>

      </div>

      {/* Current Score */}
      <div className="mt-8 flex items-end justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Current Score
          </p>

          <h1 className="mt-1 text-6xl font-bold text-white">
            92%
          </h1>

          <div className="mt-3 flex items-center gap-2 text-emerald-400">

            <TrendingDown className="h-4 w-4" />

            <span className="text-sm font-medium">
              Risk decreased by 4.2%
            </span>

          </div>

        </div>

        {/* Time Filter */}
        <div className="flex gap-2">

          <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white">
            7D
          </button>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:border-cyan-500 hover:text-white transition">
            30D
          </button>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:border-cyan-500 hover:text-white transition">
            90D
          </button>

        </div>

      </div>

      {/* Chart */}
      <div className="mt-8 h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={riskData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              domain={[80, 100]}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
            />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#06b6d4",
              }}
              activeDot={{
                r: 7,
                fill: "#22d3ee",
              }}
              animationDuration={1200}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}
      <div className="mt-6 grid grid-cols-2 gap-6 border-t border-slate-800 pt-6">

        <div>

          <p className="text-sm text-slate-500">
            Current Risk
          </p>

          <div className="mt-2 flex items-center gap-2">

            <ShieldCheck className="h-5 w-5 text-emerald-400" />

            <span className="font-semibold text-emerald-400">
              LOW
            </span>

          </div>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            AI Confidence
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            97.4%
          </h3>

        </div>

      </div>

    </div>
  );
}