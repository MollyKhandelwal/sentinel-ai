"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Shield,
  LayoutDashboard,
  Factory,
  TriangleAlert,
  BarChart3,
  Bot,
  FileText,
  Settings,
  Circle,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Digital Twin",
    href: "/digital-twin",
    icon: Factory,
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: TriangleAlert,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "AI Copilot",
    href: "/ai-copilot",
    icon: Bot,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <Shield className="h-9 w-9 text-blue-500" />

          <div>
            <h1 className="text-xl font-bold text-white">
              Sentinel AI
            </h1>

            <p className="text-xs text-slate-400">
              Predict • Prevent • Protect
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            M
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Molly Sharma
            </h3>

            <p className="text-xs text-slate-400">
              Operations Manager
            </p>

            <div className="mt-1 flex items-center gap-1">
              <Circle className="h-2 w-2 fill-green-500 text-green-500" />

              <span className="text-xs text-green-400">
                Online
              </span>
            </div>
          </div>

        </div>
      </div>

    </aside>
  );
}