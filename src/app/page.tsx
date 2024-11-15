// src/app/page.tsx
"use client";

import { useState } from "react";
import SummonerProfile from "@/components/SummonerProfile";
import MatchHistory from "@/components/MatchHistory";
import type { SummonerResponse } from "../types/summoner";

export default function HomePage() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState<SummonerResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!summonerName.includes("#")) {
      setError("Please enter your Riot ID in the format: Name#TAG");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/summoner?name=${encodeURIComponent(summonerName)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setSummonerData(data as SummonerResponse);
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch summoner data"
      );
      setSummonerData(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            placeholder="Enter Riot ID (Name#TAG)"
            className="p-2 rounded bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-red-500/20 border border-red-500 rounded text-center">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {summonerData && !loading && (
        <div className="max-w-2xl mx-auto space-y-6">
          <SummonerProfile
            summoner={summonerData.summoner}
            ranked={summonerData.ranked}
          />
          <h3 className="text-xl font-bold">Match History</h3>
          <MatchHistory
            matches={summonerData.matches}
            summonerPuuid={summonerData.summoner.puuid}
          />
        </div>
      )}
    </div>
  );
}
