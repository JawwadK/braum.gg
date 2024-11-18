"use client";

import Image from "next/image";
import { useState } from "react";

interface SummonerProfileProps {
  summoner: {
    name: string;
    tagLine?: string;
    displayName?: string;
    profileIconId: number;
    summonerLevel: number;
    puuid: string;
    ddragonVersion?: string;
  };
  ranked: Array<{
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  }>;
}

export default function SummonerProfile({
  summoner,
  ranked,
}: SummonerProfileProps) {
  const [iconError, setIconError] = useState(false);
  const [isIconLoading, setIsIconLoading] = useState(true);

  const soloQueue = ranked.find(
    (queue) => queue.queueType === "RANKED_SOLO_5x5"
  );

  const getProfileIconUrl = (iconId: number) => {
    const version = summoner.ddragonVersion || "14.5.1";
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;
  };

  const getFallbackProfileIcon = () => {
    const version = summoner.ddragonVersion || "14.5.1";
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/1.png`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative w-[100px] h-[100px]">
          {isIconLoading && (
            <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse" />
          )}
          <Image
            src={
              iconError
                ? getFallbackProfileIcon()
                : getProfileIconUrl(summoner.profileIconId)
            }
            alt={`${summoner.name}'s profile icon`}
            fill
            className={`rounded-full border-2 border-gray-700 object-cover ${
              isIconLoading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-200`}
            onError={() => {
              setIconError(true);
              setIsIconLoading(false);
            }}
            onLoad={() => setIsIconLoading(false)}
            priority
            unoptimized
          />
          <div className="absolute -bottom-1 -right-1 bg-gray-900 px-2 py-0.5 rounded-full border border-gray-700 text-sm">
            {summoner.summonerLevel}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            {summoner.displayName || summoner.name}
            {summoner.tagLine &&
              !summoner.displayName &&
              `#${summoner.tagLine}`}
          </h2>
          {soloQueue && (
            <div className="mt-2 space-y-1">
              <p className="text-lg font-medium flex items-center gap-2">
                <span>
                  {soloQueue.tier} {soloQueue.rank}
                </span>
                <span className="text-blue-400">
                  {soloQueue.leaguePoints} LP
                </span>
              </p>
              <p className="text-sm text-gray-400">
                {soloQueue.wins}W {soloQueue.losses}L
                <span className="ml-2">
                  (
                  {(
                    (soloQueue.wins / (soloQueue.wins + soloQueue.losses)) *
                    100
                  ).toFixed(1)}
                  % WR)
                </span>
              </p>
            </div>
          )}
          {!soloQueue && <p className="text-gray-400 mt-1">Unranked</p>}
        </div>
      </div>
    </div>
  );
}
