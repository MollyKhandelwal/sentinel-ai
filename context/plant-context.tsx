"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type PlantZone = {
  id: string;
  name: string;
  temperature: number;
  pressure: number;
  methane: string;
  risk: "Normal" | "Warning" | "Critical";
};

export type Alert = {
  id: number;
  title: string;
  severity: "Normal" | "Warning" | "Critical";
  time: string;
};

interface PlantContextType {
  selectedZone: string;
  setSelectedZone: (id: string) => void;

  zones: PlantZone[];
  setZones: React.Dispatch<
    React.SetStateAction<PlantZone[]>
  >;

  alerts: Alert[];
  setAlerts: React.Dispatch<
    React.SetStateAction<Alert[]>
  >;

  shutdownRecommended: boolean;
  setShutdownRecommended: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  // NEW GLOBAL STATES

  plantHealth: number;
  setPlantHealth: React.Dispatch<
    React.SetStateAction<number>
  >;

  aiConfidence: number;
  setAiConfidence: React.Dispatch<
    React.SetStateAction<number>
  >;

  sensorOnline: number;
  setSensorOnline: React.Dispatch<
    React.SetStateAction<number>
  >;
}

const PlantContext = createContext<PlantContextType | null>(
  null
);

export function PlantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedZone, setSelectedZone] =
    useState("boiler");

  const [shutdownRecommended, setShutdownRecommended] =
    useState(false);

  // GLOBAL LIVE STATES

  const [plantHealth, setPlantHealth] =
    useState(94);

  const [aiConfidence, setAiConfidence] =
    useState(97.4);

  const [sensorOnline, setSensorOnline] =
    useState(128);

  const [zones, setZones] = useState<PlantZone[]>([
    {
      id: "boiler",
      name: "Boiler Zone B",
      temperature: 96,
      pressure: 7.2,
      methane: "High",
      risk: "Critical",
    },
    {
      id: "tank",
      name: "Tank A",
      temperature: 42,
      pressure: 3.4,
      methane: "Low",
      risk: "Normal",
    },
    {
      id: "warehouse",
      name: "Warehouse",
      temperature: 31,
      pressure: 1.8,
      methane: "Low",
      risk: "Warning",
    },
    {
      id: "cooling",
      name: "Cooling Unit",
      temperature: 19,
      pressure: 2.3,
      methane: "Low",
      risk: "Normal",
    },
    {
      id: "conveyor",
      name: "Conveyor",
      temperature: 38,
      pressure: 1.5,
      methane: "Low",
      risk: "Normal",
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      title: "Boiler Zone B Temperature High",
      severity: "Critical",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Warehouse Sensor Warning",
      severity: "Warning",
      time: "10 min ago",
    },
  ]);

  return (
    <PlantContext.Provider
      value={{
        selectedZone,
        setSelectedZone,

        zones,
        setZones,

        alerts,
        setAlerts,

        shutdownRecommended,
        setShutdownRecommended,

        plantHealth,
        setPlantHealth,

        aiConfidence,
        setAiConfidence,

        sensorOnline,
        setSensorOnline,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
}

export function usePlant() {
  const context = useContext(PlantContext);

  if (!context) {
    throw new Error(
      "usePlant must be used inside PlantProvider"
    );
  }

  return context;
}