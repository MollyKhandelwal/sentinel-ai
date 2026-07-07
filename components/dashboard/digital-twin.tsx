"use client";

import { useState } from "react";

import FactoryMap from "./factory-map";
import ZoneDetails from "./zone-details";

type ZoneId =
  | "tank"
  | "boiler"
  | "conveyor"
  | "cooling"
  | "warehouse";

export default function DigitalTwin() {
  const [selectedZone, setSelectedZone] =
    useState<ZoneId>("boiler");

  return (
    <section className="space-y-6">

      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          LIVE DIGITAL TWIN
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Interactive Factory Monitor
        </h2>

        <p className="mt-2 max-w-3xl text-slate-400">
          Select any production zone to inspect real-time
          operational status, sensor values and AI
          recommendations.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">

        <FactoryMap
          selectedZone={selectedZone}
          onSelectZone={(zone) =>
            setSelectedZone(zone as ZoneId)
          }
        />

        <ZoneDetails
          selectedZone={selectedZone}
        />

      </div>

    </section>
  );
}