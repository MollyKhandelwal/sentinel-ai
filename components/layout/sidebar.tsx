"use client";

import { Shield } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-slate-800 bg-slate-900">
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <Shield className="h-8 w-8 text-blue-500" />

        <div>
          <h1 className="text-lg font-bold text-white">
            Sentinel AI
          </h1>

          <p className="text-xs text-slate-400">
            Predict • Prevent • Protect
          </p>
        </div>
      </div>

      <nav className="p-6">
        <p className="text-sm text-slate-500">
          Navigation coming soon...
        </p>
      </nav>
    </aside>
  );
}