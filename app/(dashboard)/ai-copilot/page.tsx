"use client";

import { useState } from "react";

import ChatWindow from "@/components/ai/chat-window";
import ChatInput from "@/components/ai/chat-input";
import AlertToast from "@/components/common/alert-toast";

import { usePlant } from "@/context/plant-context";

export interface ChatMessage {
  role: "user" | "assistant";
  message: string;
}

export default function AICopilotPage() {
  const {
    setZones,
    setAlerts,
    setShutdownRecommended,
    setSelectedZone,
  } = usePlant();

  const [showAlert, setShowAlert] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      message:
        "👋 Hello! I'm Sentinel AI Copilot.\n\nI can help you analyze industrial safety, sensor readings, plant health, alerts and operational risks.\n\nTry asking:\n• Show critical zones\n• Why is methane increasing?\n• Show sensor status\n• Temperature report\n• Should we shutdown Boiler Zone B?",
    },
  ]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      message: text.trim(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: "assistant",
        message: "🤖 Sentinel AI is analyzing...",
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      const q = text.toLowerCase();

      if (
        q.includes("shutdown") ||
        q.includes("critical") ||
        q.includes("methane") ||
        q.includes("gas") ||
        q.includes("leak")
      ) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 4000);

        setSelectedZone("boiler");

        setShutdownRecommended(true);

        setZones((prev) =>
          prev.map((zone) =>
            zone.id === "boiler"
              ? {
                  ...zone,
                  risk: "Critical",
                  temperature: 98,
                  pressure: 7.8,
                  methane: "Very High",
                }
              : zone
          )
        );

        setAlerts((prev) => [
          {
            id: Date.now(),
            title: "Emergency Shutdown Recommended",
            severity: "Critical",
            time: "Just now",
          },
          ...prev,
        ]);
      }

      setMessages((prev) => {
        const updated = [...prev];

        if (
          updated.length &&
          updated[updated.length - 1].message ===
            "🤖 Sentinel AI is analyzing..."
        ) {
          updated.pop();
        }

        updated.push({
          role: "assistant",
          message:
            data.reply ??
            "⚠️ Sentinel AI returned an empty response.",
        });

        return updated;
      });
    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];

        if (
          updated.length &&
          updated[updated.length - 1].message ===
            "🤖 Sentinel AI is analyzing..."
        ) {
          updated.pop();
        }

        updated.push({
          role: "assistant",
          message:
            "❌ Unable to connect with Sentinel AI.\n\nPlease verify your Gemini API configuration and try again.",
        });

        return updated;
      });
    }
  }

  return (
    <div className="space-y-8">

      <AlertToast
        show={showAlert}
        title="🚨 Critical Alert"
        message="Boiler Zone B methane concentration exceeded safe operating limits. Immediate inspection recommended."
      />

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          AI COPILOT
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Sentinel AI Assistant
        </h1>

        <p className="mt-2 max-w-3xl text-slate-400">
          Ask questions about plant operations, sensor readings,
          industrial safety, equipment health and receive AI-powered
          recommendations in real time.
        </p>
      </section>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <ChatWindow messages={messages} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}