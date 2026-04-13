import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { DifficultyChartChart } from "@/components/dashboard/difficulty-chart";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { RecentProblems } from "@/components/dashboard/recent-problems";
import { TeamCollaboration } from "@/components/dashboard/team-collaboration";
import { TopicProgress } from "@/components/dashboard/topic-progress";
import { ActiveChallenge } from "@/components/dashboard/active-challenge";

import {
  mockMetrics,
  mockDifficultyData,
  mockRanking,
  mockRecentProblems,
  mockTeamProgress,
  mockTopicProgress,
  mockCurrentChallenge,
} from "@/lib/mock-user";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-[260px] flex flex-col min-h-screen">
        {/* Top Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <main className="flex-1 p-8 flex flex-col gap-8 dashboard-scroll relative">
          {/* Subtle background glow for the main area */}
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none -z-10" />
          
          {/* Metric Strip */}
          <div className="animate-dash animate-dash-1">
            <MetricCards metrics={mockMetrics} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-dash animate-dash-2">
            <div className="xl:col-span-2">
              <DifficultyChartChart data={mockDifficultyData} />
            </div>
            <Leaderboard ranking={mockRanking} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-dash animate-dash-3 font-medium">
            <RecentProblems problems={mockRecentProblems} />
            <TeamCollaboration members={mockTeamProgress} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-dash animate-dash-4">
            <TopicProgress data={mockTopicProgress} />
            <ActiveChallenge challenge={mockCurrentChallenge} />
          </div>
        </main>
      </div>
    </div>
  );
}
