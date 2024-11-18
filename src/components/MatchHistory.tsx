"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { DDRAGON_BASE_URL } from "@/constants";
import { Sword, Wand, ArrowRight, Heart, Trees } from "lucide-react";

interface MatchHistoryProps {
  matches: any[];
  summonerPuuid: string;
  summonerName?: string;
}

export default function MatchHistory({
  matches,
  summonerPuuid,
  summonerName,
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
      return <Trees className="w-4 h-4 text-emerald-400" />;
    }
    if (role === "CARRY" || lane === "BOTTOM") {
      return <ArrowRight className="w-4 h-4 text-amber-400" />;
    }
    if (lane === "MIDDLE") {
      return <Wand className="w-4 h-4 text-purple-400" />;
    }
    return <Sword className="w-4 h-4 text-rose-400" />;
  };

  if (matches.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No matches found for {summonerName || "this player"}.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {summonerName && (
        <div className="pb-4">
          <h2 className="text-2xl font-bold text-foreground">{summonerName}</h2>
          <p className="text-muted-foreground text-sm">Recent Matches</p>
        </div>
      )}

      {matches.map((match) => {
        const participant = match.info.participants.find(
          (p: any) => p.puuid === summonerPuuid
        );

        const outcomeStyle = participant.win
          ? "bg-primary/10 border-primary/50 hover:bg-primary/20"
          : "bg-destructive/10 border-destructive/50 hover:bg-destructive/20";

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
                  <div className="text-xs text-muted-foreground">
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
                      <div className="absolute -bottom-1 -right-1 bg-background/90 text-xs px-1 rounded border border-border">
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
                      <div className="text-xs text-muted-foreground mt-0.5">
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
                      Number(kda) >= 3
                        ? "text-emerald-400"
                        : "text-muted-foreground"
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
                  <div className="text-xs text-muted-foreground">
                    {csPerMin} per min
                  </div>
                </div>

                {/* Game outcome */}
                <div className="w-24 text-right">
                  <div
                    className={`text-sm font-medium ${
                      participant.win ? "text-primary" : "text-destructive"
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
                      className="w-6 h-6 bg-card rounded border border-border"
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
