"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Search,
  Filter,
} from "lucide-react";

type Severity = "Critical" | "Warning" | "Info";

type AlertItem = {
  id: number;
  title: string;
  zone: string;
  severity: Severity;
  time: string;
  description: string;
};

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    title: "Methane Leak Detected",
    zone: "Boiler Zone B",
    severity: "Critical",
    time: "2 min ago",
    description:
      "Methane concentration exceeded the safe operating threshold.",
  },
  {
    id: 2,
    title: "Pressure Rising",
    zone: "Boiler Zone B",
    severity: "Warning",
    time: "6 min ago",
    description:
      "Pressure has increased by 18% during the last monitoring cycle.",
  },
  {
    id: 3,
    title: "Temperature Spike",
    zone: "Warehouse",
    severity: "Warning",
    time: "12 min ago",
    description:
      "Warehouse temperature crossed the recommended limit.",
  },
  {
    id: 4,
    title: "Sensor Back Online",
    zone: "Cooling Unit",
    severity: "Info",
    time: "22 min ago",
    description:
      "Temperature sensor has resumed normal operation.",
  },
];

export default function AlertsCenter() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const [filter, setFilter] = useState<
    "All" | "Critical" | "Warning" | "Info"
  >("All");

  const [search, setSearch] = useState("");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesFilter =
        filter === "All" || alert.severity === filter;

      const matchesSearch =
        alert.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        alert.zone
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [alerts, filter, search]);

  const criticalCount = alerts.filter(
    (a) => a.severity === "Critical"
  ).length;

  const warningCount = alerts.filter(
    (a) => a.severity === "Warning"
  ).length;

  const infoCount = alerts.filter(
    (a) => a.severity === "Info"
  ).length;

  function resolveAlert(id: number) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-6">

      {/* Top Cards */}

      <div className="grid gap-5 md:grid-cols-4">

        <Card
          title="Total Alerts"
          value={alerts.length}
          color="cyan"
        />

        <Card
          title="Critical"
          value={criticalCount}
          color="red"
        />

        <Card
          title="Warning"
          value={warningCount}
          color="amber"
        />

        <Card
          title="Information"
          value={infoCount}
          color="emerald"
        />

      </div>

      {/* Search */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search
              className="absolute left-4 top-3.5 text-slate-500"
              size={18}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search alerts..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none"
            />

          </div>

          <div className="flex flex-wrap gap-3">

            {[
              "All",
              "Critical",
              "Warning",
              "Info",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(item as any)
                }
                className={`rounded-full px-4 py-2 text-sm transition ${
                  filter === item
                    ? "bg-cyan-500 text-black font-semibold"
                    : "border border-slate-700 text-slate-300"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* Alert Cards */}

      <div className="space-y-5">

        {filteredAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onResolve={() =>
              resolveAlert(alert.id)
            }
          />
        ))}

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "cyan" | "red" | "amber" | "emerald";
}) {
  const colors = {
    cyan: "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
    red: "border-red-500/20 bg-red-500/5 text-red-400",
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
  };

  return (
    <div
      className={`rounded-2xl border p-6 ${colors[color]}`}
    >
      <p className="text-sm uppercase tracking-widest">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}

function AlertCard({
  alert,
  onResolve,
}: {
  alert: AlertItem;
  onResolve: () => void;
}) {
  const styles = {
    Critical: {
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      badge: "bg-red-500/20 text-red-400",
      icon: <ShieldAlert className="text-red-400" size={24} />,
    },

    Warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/5",
      badge: "bg-amber-500/20 text-amber-400",
      icon: (
        <AlertTriangle
          className="text-amber-400"
          size={24}
        />
      ),
    },

    Info: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      badge:
        "bg-emerald-500/20 text-emerald-400",
      icon: (
        <CheckCircle2
          className="text-emerald-400"
          size={24}
        />
      ),
    },
  };

  const style = styles[alert.severity];

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-6 transition hover:scale-[1.01]`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-slate-900 p-3">
            {style.icon}
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-xl font-bold text-white">
                {alert.title}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
              >
                {alert.severity}
              </span>

            </div>

            <p className="mt-2 text-slate-300">
              {alert.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-400">

              <span>
                📍 {alert.zone}
              </span>

              <span>
                🕒 {alert.time}
              </span>

            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            className="rounded-xl border border-cyan-500/30 px-4 py-2 text-cyan-400 transition hover:bg-cyan-500/10"
          >
            View
          </button>

          <button
            onClick={onResolve}
            className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400"
          >
            Resolve
          </button>

        </div>

      </div>
    </div>
  );
}