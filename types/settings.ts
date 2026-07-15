export type AIModel = "gemini-2.5-flash" | "gemini-2.5-pro";

export type Timezone =
  | "UTC"
  | "US/Eastern"
  | "US/Central"
  | "US/Mountain"
  | "US/Pacific"
  | "Europe/London"
  | "Europe/Berlin"
  | "Asia/Kolkata"
  | "Asia/Tokyo"
  | "Asia/Singapore"
  | "Australia/Sydney";

export type SensorRefreshRate = "1" | "2" | "5" | "10";

export type DefaultZone = "boiler" | "tank" | "warehouse" | "cooling" | "conveyor";

export type AccentColor = "cyan" | "blue" | "emerald" | "purple";

export type SessionTimeout = "15" | "30" | "60";

export interface ProfileSettings {
  name: string;
  email: string;
  role: string;
  plantName: string;
  department: string;
}

export interface AISettingsData {
  model: AIModel;
  confidenceThreshold: number;
  autoRecommendations: boolean;
  autoIncidentDetection: boolean;
  autoShutdownRecommendation: boolean;
  showAIReasoning: boolean;
}

export interface PlantConfigData {
  factoryName: string;
  plantId: string;
  timezone: Timezone;
  sensorRefreshRate: SensorRefreshRate;
  defaultZone: DefaultZone;
}

export interface NotificationSettingsData {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  criticalAlertsOnly: boolean;
  dailyReports: boolean;
  weeklyReports: boolean;
}

export interface AppearanceSettingsData {
  darkMode: boolean;
  compactLayout: boolean;
  accentColor: AccentColor;
}

export interface SecuritySettingsData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  sessionTimeout: SessionTimeout;
}

export interface SystemStatusData {
  geminiApi: "connected" | "disconnected" | "error";
  database: "connected" | "disconnected" | "error";
  sensorsOnline: number;
  serverStatus: "healthy" | "degraded" | "down";
  aiConfidence: number;
  appVersion: string;
}

export const AIModelLabels: Record<AIModel, string> = {
  "gemini-2.5-flash": "Gemini 2.5 Flash",
  "gemini-2.5-pro": "Gemini 2.5 Pro",
};

export const TimezoneLabels: Record<Timezone, string> = {
  UTC: "UTC",
  "US/Eastern": "US Eastern (ET)",
  "US/Central": "US Central (CT)",
  "US/Mountain": "US Mountain (MT)",
  "US/Pacific": "US Pacific (PT)",
  "Europe/London": "Europe/London (GMT)",
  "Europe/Berlin": "Europe/Berlin (CET)",
  "Asia/Kolkata": "Asia/Kolkata (IST)",
  "Asia/Tokyo": "Asia/Tokyo (JST)",
  "Asia/Singapore": "Asia/Singapore (SGT)",
  "Australia/Sydney": "Australia/Sydney (AEST)",
};

export const SensorRefreshLabels: Record<SensorRefreshRate, string> = {
  "1": "1 second",
  "2": "2 seconds",
  "5": "5 seconds",
  "10": "10 seconds",
};

export const DefaultZoneLabels: Record<DefaultZone, string> = {
  boiler: "Boiler Zone B",
  tank: "Tank A",
  warehouse: "Warehouse",
  cooling: "Cooling Unit",
  conveyor: "Conveyor",
};

export const AccentColorLabels: Record<AccentColor, string> = {
  cyan: "Cyan",
  blue: "Blue",
  emerald: "Emerald",
  purple: "Purple",
};

export const AccentColorValues: Record<AccentColor, string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  emerald: "#10b981",
  purple: "#a855f7",
};

export const SessionTimeoutLabels: Record<SessionTimeout, string> = {
  "15": "15 minutes",
  "30": "30 minutes",
  "60": "1 hour",
};

export const DEFAULT_PROFILE: ProfileSettings = {
  name: "Alex Morgan",
  email: "alex.morgan@sentinel-ai.com",
  role: "Safety Operations Manager",
  plantName: "Sentinel Industrial Complex Alpha",
  department: "Operations & Safety",
};

export const DEFAULT_AI: AISettingsData = {
  model: "gemini-2.5-flash",
  confidenceThreshold: 85,
  autoRecommendations: true,
  autoIncidentDetection: true,
  autoShutdownRecommendation: false,
  showAIReasoning: true,
};

export const DEFAULT_PLANT: PlantConfigData = {
  factoryName: "Sentinel Industrial Complex Alpha",
  plantId: "SEN-ALPHA-001",
  timezone: "Asia/Kolkata",
  sensorRefreshRate: "5",
  defaultZone: "boiler",
};

export const DEFAULT_NOTIFICATIONS: NotificationSettingsData = {
  emailAlerts: true,
  smsAlerts: false,
  pushNotifications: true,
  criticalAlertsOnly: false,
  dailyReports: true,
  weeklyReports: true,
};

export const DEFAULT_APPEARANCE: AppearanceSettingsData = {
  darkMode: true,
  compactLayout: false,
  accentColor: "cyan",
};

export const DEFAULT_SECURITY: SecuritySettingsData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorEnabled: false,
  sessionTimeout: "30",
};

export const DEFAULT_SYSTEM: SystemStatusData = {
  geminiApi: "connected",
  database: "connected",
  sensorsOnline: 128,
  serverStatus: "healthy",
  aiConfidence: 97.4,
  appVersion: "v2.0.0",
};
