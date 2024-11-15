"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { DDRAGON_BASE_URL } from "@/constants";

interface MatchHistoryProps {
  matches: any[];
  summonerPuuid: string;
}

export default function MatchHistory({
  matches,
  summonerPuuid,
}: MatchHistoryProps) {
  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const participant = match.info.participants.find(
          (p: any) => p.puuid === summonerPuuid
        );

        return (
          <Link
            href={`/match/${match.metadata.matchId}?puuid=${summonerPuuid}`}
            key={match.metadata.matchId}
          >
            <div
              className={`bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors ${
                participant.win
                  ? "border-l-4 border-green-500"
                  : "border-l-4 border-red-500"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Image
                    src={`${DDRAGON_BASE_URL}/img/champion/${participant.championName}.png`}
                    alt={participant.championName}
                    width={48}
                    height={48}
                    className="rounded"
                    unoptimized
                  />
                  <div>
                    <p className="font-bold">{participant.championName}</p>
                    <p className="text-sm text-gray-400">
                      {participant.kills}/{participant.deaths}/
                      {participant.assists}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p>{match.info.gameMode}</p>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(match.info.gameEndTimestamp))}{" "}
                  ago
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
