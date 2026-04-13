import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { GlobalRankingPage } from "@/components/ranking/GlobalRankingPage";

export const metadata = {
  title: 'Ranking Global | Logic.dev',
  description: 'Veja os top desenvolvedores na Logic.dev',
};

export default function RankingRoute() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Sidebar for App Layout Consistency */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-[260px] flex flex-col min-h-screen">
        {/* Top Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 flex flex-col dashboard-scroll relative">
          
          {/* Subtle Ambient Glow Specific to Ranking Page */}
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none -z-10" />
          <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none -z-10" />

          {/* Core Page Component */}
          <div className="animate-dash animate-dash-1 flex-1 flex flex-col">
            <GlobalRankingPage />
          </div>

        </main>
      </div>
    </div>
  );
}
