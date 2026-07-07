export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          SETTINGS
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure Sentinel AI preferences and system settings.
        </p>
      </section>
    </div>
  );
}