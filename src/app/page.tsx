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

      // Debug log
      console.log("API Response:", data);

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

  // Debug log for rendered data
  if (summonerData) {
    console.log("Rendering with summoner data:", summonerData);
  }

  return (
    <div className="space-y-8">
      {/* Search form */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
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

      {/* Error display */}
      {error && (
        <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500 rounded-lg text-center text-red-500">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Summoner data display */}
      {summonerData && !loading && (
        <div className="space-y-6">
          <SummonerProfile
            summoner={summonerData.summoner}
            ranked={summonerData.ranked}
          />
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-6">Match History</h3>
            <MatchHistory
              matches={summonerData.matches}
              summonerPuuid={summonerData.summoner.puuid}
              summonerName={summonerData.summoner.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
