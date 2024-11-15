// src/app/match/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import MatchDetails from "@/components/MatchDetails";
import type { MatchData } from "../../../types/summoner";

interface MatchPageData {
  match: MatchData;
  timeline: any; // Replace with proper timeline type when created
}

export default function MatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const summonerPuuid = searchParams.get("puuid");
  const [matchData, setMatchData] = useState<MatchPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`/api/match/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.error("Error fetching match:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch match data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMatch();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !matchData || !summonerPuuid) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-500 rounded p-4 text-center">
            {error || "Match data or summoner PUUID not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Match Details</h2>
        <MatchDetails
          match={matchData.match}
          timeline={matchData.timeline}
          summonerPuuid={summonerPuuid}
        />
      </div>
    </div>
  );
}
