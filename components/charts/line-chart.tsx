"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", value: 82 },
  { day: "Tue", value: 86 },
  { day: "Wed", value: 84 },
  { day: "Thu", value: 91 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 94 },
  { day: "Sun", value: 96 },
];

export default function PlantLineChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        PERFORMANCE TREND
      </p>

      <h2 className="mt-3 text-2xl font-bold text-white">
        Plant Health (7 Days)
      </h2>

      <div className="mt-6 h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid stroke="#1e293b" />

            <XAxis dataKey="day" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}