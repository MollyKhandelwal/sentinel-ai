import {
  ShieldCheck,
  TriangleAlert,
  Activity,
  Factory,
} from "lucide-react";

import KPICard from "@/components/dashboard/kpi-card";
import RiskChart from "@/components/dashboard/risk-chart";
import LiveAlerts from "@/components/dashboard/live-alerts";
import AIRecommendation from "@/components/dashboard/ai-recommendation";
import IncidentTimeline from "@/components/dashboard/incident-timeline";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          LIVE COMMAND CENTER
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Plant Operations Command Center
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Monitor industrial safety, analyze operational risks, and respond to
          critical events using AI-powered intelligence.
        </p>
      </section>

      {/* KPI Grid */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Safety Score"
          value="96%"
          subtitle="Excellent"
          icon={ShieldCheck}
          variant="green"
        />

        <KPICard
          title="Open Alerts"
          value="03"
          subtitle="Critical"
          icon={TriangleAlert}
          variant="red"
        />

        <KPICard
          title="Active Sensors"
          value="128"
          subtitle="Online"
          icon={Activity}
          variant="cyan"
        />

        <KPICard
          title="Plant Health"
          value="94%"
          subtitle="Healthy"
          icon={Factory}
          variant="blue"
        />
      </section>

      {/* Dashboard Grid */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Risk Chart */}
        <div className="xl:col-span-2">
          <RiskChart />
        </div>

        {/* Live Alerts */}
        <LiveAlerts />

        {/* AI Recommendation */}
        <div className="xl:col-span-2">
          <AIRecommendation />
        </div>

        {/* Incident Timeline */}
        <IncidentTimeline />
      </section>
    </div>
  );
}