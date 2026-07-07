"use client";

type ZoneId =
  | "tank"
  | "boiler"
  | "conveyor"
  | "cooling"
  | "warehouse";

interface ZoneDetailsProps {
  selectedZone: ZoneId;
}

const zoneData = {
  tank: {
    name: "Tank A",
    status: "Normal",
    temperature: "34°C",
    pressure: "2.4 bar",
    gas: "Normal",
    ai: "Continue normal operations.",
    color: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
  },

  boiler: {
    name: "Boiler Zone B",
    status: "Critical",
    temperature: "96°C",
    pressure: "7.2 bar",
    gas: "Methane High",
    ai: "Immediate shutdown recommended.",
    color: "text-red-400",
    badge: "bg-red-500/10 text-red-400",
  },

  conveyor: {
    name: "Conveyor",
    status: "Normal",
    temperature: "39°C",
    pressure: "1.8 bar",
    gas: "Normal",
    ai: "No action required.",
    color: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
  },

  cooling: {
    name: "Cooling Unit",
    status: "Normal",
    temperature: "28°C",
    pressure: "2.1 bar",
    gas: "Normal",
    ai: "Cooling efficiency is optimal.",
    color: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
  },

  warehouse: {
    name: "Warehouse",
    status: "Warning",
    temperature: "45°C",
    pressure: "3.0 bar",
    gas: "Normal",
    ai: "Inspect ventilation system.",
    color: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400",
  },
};

export default function ZoneDetails({
  selectedZone,
}: ZoneDetailsProps) {
  const zone = zoneData[selectedZone];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        Selected Zone
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        {zone.name}
      </h2>

      <div
        className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${zone.badge}`}
      >
        {zone.status}
      </div>

      <div className="mt-8 space-y-5">

        <InfoRow
          label="Temperature"
          value={zone.temperature}
        />

        <InfoRow
          label="Pressure"
          value={zone.pressure}
        />

        <InfoRow
          label="Gas Level"
          value={zone.gas}
        />

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">

        <p className="text-sm uppercase tracking-wider text-cyan-400">
          AI Recommendation
        </p>

        <p className="mt-3 text-sm text-slate-300">
          {zone.ai}
        </p>

      </div>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">

      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>

    </div>
  );
}