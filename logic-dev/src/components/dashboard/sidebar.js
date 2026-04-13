"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Braces,
  BarChart3,
  Calendar,
  Trophy,
  MessageSquare,
  Users,
  Smartphone,
} from "lucide-react";

const MENU_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/exercises", icon: Braces, label: "Problemas" },
  { href: "/dashboard", icon: BarChart3, label: "Minhas Estatísticas" },
  { href: "/dashboard", icon: Calendar, label: "Calendário" },
  { href: "/ranking", icon: Trophy, label: "Leaderboard" },
  { href: "/dashboard", icon: MessageSquare, label: "Discussões" },
  { href: "/dashboard", icon: Users, label: "Team Collaborations" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] flex flex-col z-50 bg-[#0a0a0c] border-r border-white/5">
      {/* Logo */}
      <div className="px-8 h-24 flex items-center">
        <Link href="/" className="font-[var(--font-title)] font-bold text-2xl flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
            <i className="fa-solid fa-code text-sm text-white" />
          </span>
          <span className="tracking-tighter">Logic<span className="text-purple-400">.dev</span></span>
        </Link>
      </div>

      {/* Menu Sections */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-6 overflow-y-auto">
        <div>
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Menu Principal
          </p>
          <div className="flex flex-col gap-1.5">
            {MENU_ITEMS.slice(0, 3).map((item) => {
              const Icon = item.icon;
              const active = item.href !== "/dashboard"
                ? pathname?.startsWith(item.href)
                : pathname === "/dashboard" && item.label === "Dashboard";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-white bg-white/5"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                  }`}
                >
                  {active && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    />
                  )}
                  <Icon className={`h-5 w-5 shrink-0 transition-colors duration-300 ${active ? "text-purple-400" : "group-hover:text-purple-300"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Comunidade & Progresso
          </p>
          <div className="flex flex-col gap-1.5">
            {MENU_ITEMS.slice(3).map((item) => {
              const Icon = item.icon;
              const active = item.href !== "/dashboard"
                ? pathname?.startsWith(item.href)
                : pathname === "/dashboard" && item.label === "Dashboard";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-white bg-white/5"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 transition-colors duration-300 ${active ? "text-purple-400" : "group-hover:text-purple-300"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* App Card (Premium Style) */}
      <div className="px-4 pb-6">
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-300 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 hover:border-purple-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Smartphone className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white text-xs font-bold leading-tight">App Mobile</p>
              <p className="text-zinc-500 text-[10px] mt-0.5">Pratique offline</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
