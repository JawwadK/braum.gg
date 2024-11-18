"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { DDRAGON_BASE_URL } from "@/constants";
import { Sword, Wand, ArrowRight, Heart, Trees } from "lucide-react";

interface MatchHistoryProps {
  matches: any[];
  summonerPuuid: string;
  summonerName?: string; // Add this prop
}

export default function MatchHistory({
  matches,
  summonerPuuid,
  summonerName, // Accept the prop
}: MatchHistoryProps) {
  const calculateKDA = (kills: number, deaths: number, assists: number) => {
    const kda = (kills + assists) / Math.max(deaths, 1);
    return kda.toFixed(2);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGameOutcome = (participant: any) => {
    if (participant.gameEndedInEarlySurrender) return "Remake";
    return participant.win ? "Victory" : "Defeat";
  };

  const getRoleIcon = (role: string, lane: string) => {
    if (role === "SUPPORT") {
      return <Heart className="w-4 h-4 text-pink-400" />;
    }
    if (lane === "JUNGLE") {
      return <Trees className="w-4 h-4 text-green-400" />;
    }
    if (role === "CARRY" || lane === "BOTTOM") {
      return <ArrowRight className="w-4 h-4 text-yellow-400" />;
    }
    if (lane === "MIDDLE") {
      return <Wand className="w-4 h-4 text-purple-400" />;
    }
    return <Sword className="w-4 h-4 text-red-400" />;
  };

  // Add this at the start of the component to show player name if provided
  if (matches.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No matches found for {summonerName || "this player"}.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Player name header */}
      {summonerName && (
        <div className="pb-4">
          <h2 className="text-2xl font-bold text-white">{summonerName}</h2>
          <p className="text-gray-400 text-sm">Recent Matches</p>
        </div>
      )}

      {matches.map((match) => {
        const participant = match.info.participants.find(
          (p: any) => p.puuid === summonerPuuid
        );

        const outcomeStyle = participant.win
          ? "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20"
          : "bg-red-500/10 border-red-500/50 hover:bg-red-500/20";

        const kda = calculateKDA(
          participant.kills,
          participant.deaths,
          participant.assists
        );

        const csPerMin = (
          (participant.totalMinionsKilled + participant.neutralMinionsKilled) /
          (match.info.gameDuration / 60)
        ).toFixed(1);

        return (
          <Link
            href={`/match/${match.metadata.matchId}?puuid=${summonerPuuid}`}
            key={match.metadata.matchId}
          >
            <div
              className={`border rounded-lg transition-colors ${outcomeStyle} p-4`}
            >
              <div className="flex items-center gap-6">
                {/* Game info */}
                <div className="w-28">
                  <div className="text-sm font-medium mb-1">
                    {match.info.gameMode}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDistanceToNow(
                      new Date(match.info.gameEndTimestamp),
                      {
                        addSuffix: true,
                      }
                    )}
                  </div>
                  <div className="text-xs mt-1">
                    {formatDuration(match.info.gameDuration)}
                  </div>
                </div>

                {/* Champion and role info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={`${DDRAGON_BASE_URL}/img/champion/${participant.championName}.png`}
                        alt={participant.championName}
                        width={48}
                        height={48}
                        className="rounded-lg"
                        unoptimized
                      />
                      <div className="absolute -bottom-1 -right-1 bg-gray-900/90 text-xs px-1 rounded border border-gray-700">
                        {participant.champLevel}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(participant.role, participant.lane)}
                        <span className="text-sm font-medium">
                          {participant.championName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {participant.lane !== "NONE"
                          ? participant.lane.toLowerCase()
                          : "Unknown"}{" "}
                        Lane
                      </div>
                    </div>
                  </div>
                </div>

                {/* KDA */}
                <div className="w-32 text-center">
                  <div className="text-sm font-medium">
                    {participant.kills}/{participant.deaths}/
                    {participant.assists}
                  </div>
                  <div
                    className={`text-xs ${
                      Number(kda) >= 3 ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {kda} KDA
                  </div>
                </div>

                {/* CS */}
                <div className="w-24 text-center">
                  <div className="text-sm font-medium">
                    {participant.totalMinionsKilled +
                      participant.neutralMinionsKilled}{" "}
                    CS
                  </div>
                  <div className="text-xs text-gray-400">
                    {csPerMin} per min
                  </div>
                </div>

                {/* Game outcome */}
                <div className="w-24 text-right">
                  <div
                    className={`text-sm font-medium ${
                      participant.win ? "text-blue-400" : "text-red-400"
                    }`}
                  >
                    {getGameOutcome(participant)}
                  </div>
                </div>
              </div>

              {/* Item build */}
              <div className="mt-3 flex items-center gap-1">
                {[...Array(7)].map((_, i) => {
                  const itemId = participant[`item${i}`];
                  return itemId ? (
                    <Image
                      key={i}
                      src={`${DDRAGON_BASE_URL}/img/item/${itemId}.png`}
                      alt={`Item ${i + 1}`}
                      width={24}
                      height={24}
                      className="rounded"
                      unoptimized
                    />
                  ) : (
                    <div
                      key={i}
                      className="w-6 h-6 bg-gray-800 rounded border border-gray-700"
                    />
                  );
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
