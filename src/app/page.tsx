"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import SummonerProfile from "@/components/SummonerProfile";
import MatchHistory from "@/components/MatchHistory";
import type { SummonerResponse } from "@/types/summoner";
import type { MatchData } from "@/types/match";
import { HomeDecorations } from "@/components/HomeDecorations";
import { BraumShield } from "@/components/IceDecorations";

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

  const handleReset = () => {
    setSummonerData(null);
    setSummonerName("");
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col relative">
      <HomeDecorations />
      <AnimatePresence mode="wait">
        {!summonerData && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-16 text-center"
          >
            {/* Logo/Brand Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <BraumShield />
            </motion.div>

            {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 space-y-4"
            >
              <div className="relative">
                <div className="absolute -top-6 -left-4 text-6xl text-primary/20">
                  "
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                  Stand Behind Braum!
                </h1>
                <div className="absolute -bottom-8 -right-4 text-6xl text-primary/20">
                  "
                </div>
              </div>
              <p className="text-xl text-muted-foreground mt-8">
                Your trusted companion for League of Legends match analysis
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-lg"
            >
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  value={summonerName}
                  onChange={(e) => setSummonerName(e.target.value)}
                  placeholder="Enter Riot ID (Name#TAG)"
                  className="w-full bg-card/50 backdrop-blur-sm text-foreground placeholder-muted-foreground rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background border border-border/50 transition-all"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-xl opacity-0 scale-90 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all disabled:opacity-50"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? "Searching..." : "Search"}
                </motion.button>
              </form>

              {/* Error display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg text-center text-destructive"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading state */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center py-8"
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bottom tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-sm text-muted-foreground"
            >
              <p>
                Try searching for your summoner name with the new Riot ID format
              </p>
              <p className="mt-1">Example: Faker#KR1</p>
            </motion.div>
          </motion.div>
        )}

        {/* Summoner data display */}
        {summonerData && !loading && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Back button */}
            <motion.button
              onClick={handleReset}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>New Search</span>
            </motion.button>

            <SummonerProfile
              summoner={summonerData.summoner}
              ranked={summonerData.ranked}
            />
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <h3 className="text-xl font-bold mb-6">Match History</h3>
              <MatchHistory
                matches={summonerData.matches as MatchData[]}
                summonerPuuid={summonerData.summoner.puuid}
                summonerName={summonerData.summoner.name}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
