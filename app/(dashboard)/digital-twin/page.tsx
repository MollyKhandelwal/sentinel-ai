import DigitalTwin from "@/components/dashboard/digital-twin";

export const metadata = {
  title: "Digital Twin | Sentinel AI",
  description: "Interactive Factory Digital Twin Dashboard",
};

export default function DigitalTwinPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          LIVE DIGITAL TWIN
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Factory Digital Twin
        </h1>

        <p className="mt-2 max-w-3xl text-slate-400">
          Monitor every production zone in real time using AI-powered sensor
          intelligence, predictive analytics, and live operational telemetry.
        </p>
      </section>

      {/* Digital Twin Component */}
      <DigitalTwin />
    </div>
  );
}