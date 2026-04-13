"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { mockRanking } from "@/lib/mock-user";
import { Podium } from "./components/Podium";
import { RankingTable } from "./components/RankingTable";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const top3 = mockRanking.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-[260px] flex flex-col min-h-screen">
        {/* Top Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 p-8 flex flex-col dashboard-scroll relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-[-10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-900/10 blur-[150px] pointer-events-none -z-10" />
          
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-black text-white tracking-tighter flex items-center justify-center gap-3">
              <Trophy className="text-fuchsia-400" size={32} /> Ranking Global
            </h1>
            <p className="text-zinc-500 mt-2 text-sm max-w-lg mx-auto">
              Ganhe pontos resolvendo problemas e suba de nível. Os melhores desenvolvedores ganham destaque especial na nossa comunidade.
            </p>
          </div>

          <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col animate-dash">
            <Podium topUsers={top3} />
            <RankingTable ranking={mockRanking} />
          </div>

        </main>
      </div>
    </div>
  );
}
