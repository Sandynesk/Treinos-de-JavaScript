"use client";

import { useState } from "react";
import { RankingHeader } from "./RankingHeader";
import { RankingStats } from "./RankingStats";
import { RankingFilters } from "./RankingFilters";
import { UserRankCard } from "./UserRankCard";
import { RankingTable } from "./RankingTable";
import { mockRankingData, mockUserPosition } from "@/lib/mock-ranking";

export function GlobalRankingPage() {
  const [period, setPeriod] = useState("all_time");
  const [difficulty, setDifficulty] = useState("all");

  // Mock filter effect simulation (just reversing or slightly mingling for visual feedback)
  // In a real app this would trigger an API call based on period and difficulty states.
  const displayData = [...mockRankingData];
  if (period === "weekly") displayData.reverse();
  if (difficulty === "hard") displayData.sort((a,b) => b.solved - a.solved);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col pt-4">
      <RankingHeader />
      
      <RankingStats />
      
      <UserRankCard user={mockUserPosition} />

      <div className="mt-4 mb-2">
        <RankingFilters 
          period={period} 
          setPeriod={setPeriod} 
          difficulty={difficulty} 
          setDifficulty={setDifficulty} 
        />
      </div>

      <RankingTable data={displayData} currentUserId={mockUserPosition.position} />

    </div>
  );
}
