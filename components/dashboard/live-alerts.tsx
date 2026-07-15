"use client";

import { useEffect, useState } from "react";
import {
  TriangleAlert,
  Thermometer,
  CheckCircle2,
} from "lucide-react";

type Alert = {
  id: string;
  title: string;
  message: string;
  severity: string;
  status: string;
};

export default function LiveAlerts() {
  console.log("🔥 LIVE ALERTS COMPONENT RENDER");

  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    console.log("✅ LiveAlerts mounted");

    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        console.log("🚨 Alerts API:", data);
        setAlerts(data.alerts || []);
      })
      .catch(console.error);
  }, []);

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
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          let Icon = TriangleAlert;

          if (alert.severity === "MEDIUM") Icon = Thermometer;
          if (alert.status === "RESOLVED") Icon = CheckCircle2;

          return (
            <div
              key={alert.id}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-red-500/10 p-2 text-red-400">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">
                      {alert.title}
                    </h3>

                    <span className="rounded-full border border-red-500/30 px-2 py-1 text-xs text-red-400">
                      {alert.severity}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {alert.message}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {alert.status}
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