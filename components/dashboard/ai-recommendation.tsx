"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bot, ArrowRight, Sparkles } from "lucide-react";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  priority: string;
  createdAt: string;
};

export default function AIRecommendation() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    console.log("✅ AIRecommendation mounted");

    async function loadRecommendations() {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();

        console.log("🤖 AIRecommendation API:", data);

        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Recommendation Error:", error);
      }
    }

    loadRecommendations();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            AI Copilot
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Smart Recommendations
          </h2>
        </div>

        <Bot className="h-8 w-8 text-cyan-400" />
      </div>

      <div className="space-y-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                {item.priority}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {item.description}
            </p>

            <Link
              href={`/alerts/${item.id}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <Sparkles className="h-5 w-5 text-cyan-400" />

        <p className="text-sm text-cyan-300">
          AI Confidence: <strong>97.4%</strong> based on live sensor analysis.
        </p>
      </div>
    </div>
  );
}