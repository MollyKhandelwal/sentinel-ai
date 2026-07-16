"use client";

import { useState } from "react";

import ChatSidebar from "@/components/ai/chat-sidebar";
import ChatWindow from "@/components/ai/chat-window";
import ChatInput from "@/components/ai/chat-input";
import PromptBar from "@/components/ai/prompt-bar";
import AIInsights from "@/components/ai/ai-insights";
import AlertToast from "@/components/common/alert-toast";

import { usePlant } from "@/context/plant-context";
import {
  ChatMessage,
  Conversation,
  createMessage,
  QuickPrompt,
} from "@/types/chat";

export default function AICopilotPage() {
  const {
    setZones,
    setAlerts,
    setShutdownRecommended,
    setSelectedZone,
  } = usePlant();

  const [showAlert, setShowAlert] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      "assistant",
      "Hello! I'm Sentinel AI Copilot.\n\nI can help you analyze industrial safety, sensor readings, plant health, alerts and operational risks.\n\nTry asking:\n• Show critical zones\n• Why is methane increasing?\n• Show sensor status\n• Temperature report\n• Should we shutdown Boiler Zone B?"
    ),
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
  {
    id: "1",
    title: "New Conversation",
    lastMessage: "Start chatting with Sentinel AI",
    timestamp: new Date().toISOString(),
    isPinned: false,
    messages: [],
  },
]);
  const [activeConversationId, setActiveConversationId] = useState("1");

  const onSelectConversation = (id: string) => {
    setActiveConversationId(id);
    // In a real app, you would load messages for this conversation
    // For now, we'll keep the current messages as a mock
  };

  const onNewConversation = () => {
  const newId = String(conversations.length + 1);

  const newConversation: Conversation = {
    id: newId,
    title: `Conversation ${newId}`,
    lastMessage: "New chat started",
    timestamp: new Date().toISOString(),
    isPinned: false,
    messages: [],
  };
    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(newId);
    setMessages([
      createMessage(
        "assistant",
        "Hello! I'm Sentinel AI Copilot.\n\nI can help you analyze industrial safety, sensor readings, plant health, alerts and operational risks.\n\nTry asking:\n• Show critical zones\n• Why is methane increasing?\n• Show sensor status\n• Temperature report\n• Should we shutdown Boiler Zone B?"
      ),
    ]);
  };

  const onPinConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, isPinned: !conv.isPinned } : conv
      )
    );
  };

  // Mock functions for ChatWindow actions
  const onPromptClick = (prompt: string) => {
    console.log("Prompt clicked:", prompt);
    sendMessage(prompt);
  };

  const onQuickPromptClick = (prompt: QuickPrompt) => {
  console.log("Quick prompt clicked:", prompt.title);
  sendMessage(prompt.title);
};

  const onCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    console.log("Copied to clipboard:", content);
    // Ideally show a toast notification here
  };

  const onLike = (id: string) => {
    console.log("Liked message:", id);
    // Implement like logic
  };

  const onDislike = (id: string) => {
    console.log("Disliked message:", id);
    // Implement dislike logic
  };

  const onRegenerate = (id: string) => {
    console.log("Regenerate message:", id);
    // Implement regenerate logic
  };

  const onExport = () => {
    console.log("Export conversation");
    // Implement export logic
  };

  async function sendMessage(text: string) {
  if (!text.trim()) return;

  const userMessage: ChatMessage = createMessage("user", text.trim());
  setMessages((prev) => [
    ...prev,
    userMessage,
    createMessage("assistant", "Sentinel AI is analyzing..."),
  ]);
    setIsTyping(true);

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
        updated[updated.length - 1].content ===
          "Sentinel AI is analyzing..."
      ) {
        updated.pop();
      }

      updated.push(
        createMessage(
          "assistant",
          data.reply ?? "Sentinel AI returned an empty response."
        )
      );

      return updated;
    });
  } catch (error) {
    console.error(error);

    setMessages((prev) => {
      const updated = [...prev];

      if (
        updated.length &&
        updated[updated.length - 1].content ===
          "Sentinel AI is analyzing..."
      ) {
        updated.pop();
      }

      updated.push(
        createMessage(
          "assistant",
          "Unable to connect with Sentinel AI.\n\nPlease verify your Gemini API configuration and try again."
        )
      );

      return updated;
    });
    } finally {
      setIsTyping(false);
  }
}

return (
    <div className="space-y-8 overflow-x-hidden">

    <AlertToast
      show={showAlert}
      title="Critical Alert"
      message="Boiler Zone B methane concentration exceeded safe operating limits. Immediate inspection recommended."
    />

    {/* Header */}

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

    {/* AI Layout */}

    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">

      <div className="grid h-[780px] grid-cols-[280px_minmax(0,1fr)_320px] overflow-hidden">

        {/* Sidebar */}

        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onNewConversation={onNewConversation}
          onPinConversation={onPinConversation}
        />

        {/* Chat Area */}

        <div className="flex h-full min-w-0 flex-col border-x border-slate-800">

          <div className="flex-1 overflow-hidden min-h-0">

            <ChatWindow
                messages={messages}
                isTyping={isTyping}
                onPromptClick={onPromptClick}
                onQuickPromptClick={onQuickPromptClick}
                onCopy={onCopy}
                onLike={onLike}
                onDislike={onDislike}
                onRegenerate={onRegenerate}
                onExport={onExport}
              />

          </div>

          <PromptBar onSelect={sendMessage} />

          <ChatInput onSend={sendMessage} />

        </div>

        {/* Right Panel */}

        <AIInsights />

      </div>

  </div>

  </div>
);
}