"use client";

type Zone = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: "normal" | "warning" | "critical";
};

interface FactoryMapProps {
  selectedZone: string;
  onSelectZone: (zoneId: string) => void;
}

const zones: Zone[] = [
  {
    id: "tank",
    name: "Tank A",
    x: 40,
    y: 40,
    width: 170,
    height: 90,
    status: "normal",
  },
  {
    id: "conveyor",
    name: "Conveyor",
    x: 420,
    y: 40,
    width: 180,
    height: 80,
    status: "normal",
  },
  {
    id: "boiler",
    name: "Boiler Zone B",
    x: 220,
    y: 155,
    width: 210,
    height: 110,
    status: "critical",
  },
  {
    id: "cooling",
    name: "Cooling Unit",
    x: 60,
    y: 310,
    width: 170,
    height: 80,
    status: "normal",
  },
  {
    id: "warehouse",
    name: "Warehouse",
    x: 410,
    y: 305,
    width: 190,
    height: 90,
    status: "warning",
  },
];

function getFill(status: Zone["status"]) {
  switch (status) {
    case "critical":
      return "#dc2626";
    case "warning":
      return "#d97706";
    default:
      return "#059669";
  }
}

export default function FactoryMap({
  selectedZone,
  onSelectZone,
}: FactoryMapProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Digital Twin
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Factory Floor
          </h2>
        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          Live
        </div>
      </div>

      <svg
        viewBox="0 0 650 430"
        className="h-[430px] w-full rounded-xl bg-slate-950"
      >
        {/* Grid */}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="430"
            stroke="#1e293b"
            strokeWidth="1"
          />
        ))}

        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="650"
            y2={i * 50}
            stroke="#1e293b"
            strokeWidth="1"
          />
        ))}

        {zones.map((zone) => {
          const active = selectedZone === zone.id;

          return (
            <g
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className="cursor-pointer"
            >
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx="16"
                fill={getFill(zone.status)}
                opacity={active ? 1 : 0.75}
                stroke={active ? "#38bdf8" : "#334155"}
                strokeWidth={active ? 4 : 2}
              />

              <circle
                cx={zone.x + 18}
                cy={zone.y + 18}
                r="6"
                fill={
                  zone.status === "critical"
                    ? "#ef4444"
                    : zone.status === "warning"
                    ? "#f59e0b"
                    : "#22c55e"
                }
              />

              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="16"
                fontWeight="600"
              >
                {zone.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}