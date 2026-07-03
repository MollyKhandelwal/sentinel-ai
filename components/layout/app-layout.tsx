"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />

      <main className="ml-[280px] pt-16 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}