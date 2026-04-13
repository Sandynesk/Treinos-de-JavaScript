"use client";

import { Search, Bell, Plus, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { mockUser } from "@/lib/mock-user";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 px-8 flex items-center justify-between shrink-0"
      style={{ background: "rgba(10, 10, 12, 0.6)", backdropFilter: "blur(20px)" }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-300 transition-colors text-xs">
          <ChevronLeft className="h-3.5 w-3.5" /> Home
        </Link>
        <div className="h-4 w-px" style={{ background: "rgba(139, 92, 246, 0.06)" }} />
        <span className="text-xs text-zinc-400 font-medium">Dashboard</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
          <input
            type="text"
            placeholder="Buscar problemas..."
            className="w-60 h-9 pl-9 pr-4 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
            style={{
              background: "rgba(139, 92, 246, 0.03)",
              border: "1px solid rgba(139, 92, 246, 0.06)",
              backdropFilter: "blur(12px)",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(139, 92, 246, 0.15)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(139, 92, 246, 0.06)"; }}
          />
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "#8b5cf6" }} />
        </button>

        {/* Profile */}
        <Link href="/profile" className="flex items-center gap-3 pl-3 hover:opacity-80 transition-opacity cursor-pointer" style={{ borderLeft: "1px solid rgba(139, 92, 246, 0.06)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            {mockUser.initials}
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">{mockUser.name}</span>
        </Link>

        {/* CTA */}
        <Link
          href="/exercises"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-200"
          style={{ background: "rgba(124, 58, 237, 0.7)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124, 58, 237, 0.9)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124, 58, 237, 0.7)"; }}
        >
          <Plus className="h-3.5 w-3.5" /> Novo Desafio
        </Link>
      </div>
    </header>
  );
}
