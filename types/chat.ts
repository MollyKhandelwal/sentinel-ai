export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  liked?: boolean;
  disliked?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isPinned: boolean;
  messages: ChatMessage[];
}

export interface QuickPrompt {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface InsightMetric {
  label: string;
  value: string;
  color: "cyan" | "emerald" | "red" | "amber" | "blue";
  icon: React.ComponentType<{ className?: string }>;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export const DEFAULT_QUICK_PROMPTS: QuickPrompt[] = [
  { id: "analyze", icon: "📊", title: "Analyze Sensor Data", description: "Get AI-powered insights from live sensor readings" },
  { id: "report", icon: "📄", title: "Generate Incident Report", description: "Create detailed safety incident documentation" },
  { id: "predict", icon: "🔮", title: "Predict Equipment Failure", description: "AI forecasts potential equipment issues" },
  { id: "safety", icon: "🛡️", title: "Explain Safety Alert", description: "Understand the root cause of alerts" },
  { id: "risk", icon: "⚠️", title: "Risk Assessment", description: "Evaluate operational safety risks" },
  { id: "energy", icon: "⚡", title: "Energy Optimization", description: "AI recommendations for efficiency" },
];

export const DEFAULT_INSIGHT_METRICS: InsightMetric[] = [];
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [];

export function createMessage(role: "user" | "assistant", content: string): ChatMessage {
  return {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const SUPPORTED_FILE_TYPES = ".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.gif,.webp";
export const SUPPORTED_FILE_EXTENSIONS = ["pdf", "csv", "xlsx", "xls", "png", "jpg", "jpeg", "gif", "webp"];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
