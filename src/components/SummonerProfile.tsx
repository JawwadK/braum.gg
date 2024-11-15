"use client";

import Image from "next/image";
import { DDRAGON_BASE_URL } from "@/constants";

interface SummonerProfileProps {
  summoner: any;
  ranked: any[];
}

export default function SummonerProfile({
  summoner,
  ranked,
}: SummonerProfileProps) {
  const soloQueue = ranked.find(
    (queue) => queue.queueType === "RANKED_SOLO_5x5"
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative w-[100px] h-[100px]">
          <Image
            src={`${DDRAGON_BASE_URL}/img/profileicon/${summoner.profileIconId}.png`}
            alt="Profile Icon"
            width={100}
            height={100}
            className="rounded-full"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{summoner.name}</h2>
          <p className="text-gray-400">Level {summoner.summonerLevel}</p>
          {soloQueue && (
            <div className="mt-2">
              <p className="text-lg">
                {soloQueue.tier} {soloQueue.rank}
              </p>
              <p className="text-sm text-gray-400">
                {soloQueue.leaguePoints} LP | {soloQueue.wins}W{" "}
                {soloQueue.losses}L
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
