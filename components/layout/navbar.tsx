"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-[280px] top-0 z-50 flex h-16 w-[calc(100%-280px)] items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          Welcome to Sentinel AI
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <Search className="h-5 w-5 cursor-pointer text-slate-400 transition hover:text-white" />

        <Bell className="h-5 w-5 cursor-pointer text-slate-400 transition hover:text-white" />

        <UserCircle2 className="h-8 w-8 cursor-pointer text-slate-300 transition hover:text-white" />
      </div>
    </header>
  );
}