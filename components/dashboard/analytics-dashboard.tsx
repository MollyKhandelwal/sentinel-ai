import PlantLineChart from "@/components/charts/line-chart";

export default function AnalyticsDashboard() {
  const stats = [
    {
      title: "Plant Health",
      value: "94%",
      color: "text-emerald-400",
    },
    {
      title: "AI Confidence",
      value: "97.8%",
      color: "text-cyan-400",
    },
    {
      title: "Active Sensors",
      value: "128",
      color: "text-blue-400",
    },
    {
      title: "Open Alerts",
      value: "4",
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-8">

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <p className="text-sm text-slate-400">
              {card.title}
            </p>

            <h2 className={`mt-4 text-4xl font-bold ${card.color}`}>
              {card.value}
            </h2>
          </div>
        ))}

      </div>

      {/* Live Status + AI Insights */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            LIVE STATUS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Plant Performance
          </h2>

          <div className="mt-8 space-y-5">

            <Progress
              label="Production Efficiency"
              value={96}
              color="bg-cyan-500"
            />

            <Progress
              label="Equipment Health"
              value={92}
              color="bg-emerald-500"
            />

            <Progress
              label="Safety Score"
              value={94}
              color="bg-blue-500"
            />

            <Progress
              label="Power Efficiency"
              value={88}
              color="bg-yellow-500"
            />

          </div>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            AI INSIGHTS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            System Summary
          </h2>

          <div className="mt-8 space-y-4">

            <Insight
              title="Methane Level"
              value="Stable"
              color="text-emerald-400"
            />

            <Insight
              title="Temperature"
              value="Within Threshold"
              color="text-cyan-400"
            />

            <Insight
              title="Pressure"
              value="Normal"
              color="text-blue-400"
            />

            <Insight
              title="Risk Prediction"
              value="Low Risk"
              color="text-emerald-400"
            />

          </div>

        </div>

      </div>

      {/* Plant Analytics Chart */}

      <PlantLineChart />

    </div>
  );
}

function Progress({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span className="text-slate-300">
          {label}
        </span>

        <span className="font-semibold text-white">
          {value}%
        </span>

      </div>

      <div className="h-3 rounded-full bg-slate-800">

        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}

function Insight({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-4">

      <span className="text-slate-300">
        {title}
      </span>

      <span className={`font-semibold ${color}`}>
        {value}
      </span>

    </div>
  );
}