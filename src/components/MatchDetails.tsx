"use client";
import { DDRAGON_BASE_URL } from "@/constants";
import Image from "next/image";
import MatchTimeline from "./MatchTimeline";

interface MatchDetailsProps {
  match: any;
  timeline: any;
  summonerPuuid: string;
}

export default function MatchDetails({
  match,
  timeline,
  summonerPuuid,
}: MatchDetailsProps) {
  const participant = match?.info?.participants?.find(
    (p: any) => p.puuid === summonerPuuid
  );

  if (!participant) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-red-500">Participant data not found</p>
      </div>
    );
  }

  const team = match?.info?.teams?.find(
    (t: any) => t.teamId === participant.teamId
  );

  if (!team) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-red-500">Team data not found</p>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toLocaleString();
  const formatPercent = (num: number) => `${Math.round(num)}%`;

  // Calculate damage percentages
  const totalTeamDamage = match.info.participants
    .filter((p: any) => p.teamId === participant.teamId)
    .reduce((sum: number, p: any) => sum + p.totalDamageDealtToChampions, 0);
  const damageShare =
    (participant.totalDamageDealtToChampions / totalTeamDamage) * 100;

  // Calculate kill participation
  const totalTeamKills = team.objectives.champion.kills;
  const killParticipation =
    ((participant.kills + participant.assists) / Math.max(1, totalTeamKills)) *
    100;

  return (
    <div className="space-y-6">
      {/* Main Performance Panel */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Stats */}
          <div>
            <h3 className="text-xl font-bold mb-4">Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">KDA</p>
                <p className="text-xl">
                  {participant.kills}/{participant.deaths}/{participant.assists}
                </p>
                <p className="text-sm text-gray-400">
                  {(
                    (participant.kills + participant.assists) /
                    Math.max(1, participant.deaths)
                  ).toFixed(2)}{" "}
                  KDA
                </p>
              </div>
              <div>
                <p className="text-gray-400">Kill Participation</p>
                <p className="text-xl">{formatPercent(killParticipation)}</p>
                <p className="text-sm text-gray-400">
                  Team Kills: {totalTeamKills}
                </p>
              </div>
            </div>
          </div>

          {/* Build and Spells */}
          <div>
            <h3 className="text-xl font-bold mb-4">Build</h3>
            <div className="grid grid-cols-4 gap-2">
              {/* Summoner Spells */}
              <div className="col-span-4 flex gap-2 mb-2">
                <Image
                  src={`${DDRAGON_BASE_URL}/img/spell/${participant.summoner1Id}.png`}
                  alt="Summoner Spell 1"
                  width={30}
                  height={30}
                  className="rounded"
                  unoptimized
                />
                <Image
                  src={`${DDRAGON_BASE_URL}/img/spell/${participant.summoner2Id}.png`}
                  alt="Summoner Spell 2"
                  width={30}
                  height={30}
                  className="rounded"
                  unoptimized
                />
              </div>
              {/* Items */}
              {[...Array(6)].map((_, i) => {
                const itemId = participant[`item${i}`];
                return itemId ? (
                  <Image
                    key={i}
                    src={`${DDRAGON_BASE_URL}/img/item/${itemId}.png`}
                    alt={`Item ${i}`}
                    width={40}
                    height={40}
                    className="rounded"
                    unoptimized
                  />
                ) : (
                  <div key={i} className="w-10 h-10 bg-gray-700 rounded" />
                );
              })}
            </div>
          </div>

          {/* Income Stats */}
          <div>
            <h3 className="text-xl font-bold mb-4">Income</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">CS</p>
                <p className="text-xl">{participant.totalMinionsKilled}</p>
                <p className="text-sm text-gray-400">
                  {(
                    participant.totalMinionsKilled /
                    (match.info.gameDuration / 60)
                  ).toFixed(1)}{" "}
                  per min
                </p>
              </div>
              <div>
                <p className="text-gray-400">Gold Earned</p>
                <p className="text-xl">
                  {formatNumber(participant.goldEarned)}
                </p>
                <p className="text-sm text-gray-400">
                  {formatNumber(
                    Math.round(
                      participant.goldEarned / (match.info.gameDuration / 60)
                    )
                  )}{" "}
                  per min
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Damage Stats */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Damage Breakdown</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400">Damage to Champions</p>
            <p className="text-xl">
              {formatNumber(participant.totalDamageDealtToChampions)}
            </p>
            <p className="text-sm text-gray-400">
              {formatPercent(damageShare)} of team's total
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Physical</p>
                <p>
                  {formatNumber(participant.physicalDamageDealtToChampions)}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Magic</p>
                <p>{formatNumber(participant.magicDamageDealtToChampions)}</p>
              </div>
              <div>
                <p className="text-gray-400">True</p>
                <p>{formatNumber(participant.trueDamageDealtToChampions)}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-400">Damage Taken</p>
            <p className="text-xl">
              {formatNumber(participant.totalDamageTaken)}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Physical</p>
                <p>{formatNumber(participant.physicalDamageTaken)}</p>
              </div>
              <div>
                <p className="text-gray-400">Magic</p>
                <p>{formatNumber(participant.magicDamageTaken)}</p>
              </div>
              <div>
                <p className="text-gray-400">True</p>
                <p>{formatNumber(participant.trueDamageTaken)}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-400">Other Stats</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Largest Critical</p>
                <p>{formatNumber(participant.largestCriticalStrike)}</p>
              </div>
              <div>
                <p className="text-gray-400">Damage Mitigated</p>
                <p>{formatNumber(participant.damageSelfMitigated)}</p>
              </div>
              <div>
                <p className="text-gray-400">Total Healing</p>
                <p>{formatNumber(participant.totalHeal)}</p>
              </div>
              <div>
                <p className="text-gray-400">Self Healing</p>
                <p>{formatNumber(participant.totalHealsOnTeammates || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision and Objectives */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Vision & Objectives</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400">Vision Score</p>
            <p className="text-xl">{participant.visionScore}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Wards Placed</p>
                <p>{participant.wardsPlaced}</p>
              </div>
              <div>
                <p className="text-gray-400">Wards Killed</p>
                <p>{participant.wardsKilled}</p>
              </div>
              <div>
                <p className="text-gray-400">Control Wards</p>
                <p>{participant.visionWardsBoughtInGame}</p>
              </div>
              <div>
                <p className="text-gray-400">Vision Score/min</p>
                <p>
                  {(
                    participant.visionScore /
                    (match.info.gameDuration / 60)
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-400">Combat Stats</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Double Kills</p>
                <p>{participant.doubleKills}</p>
              </div>
              <div>
                <p className="text-gray-400">Triple Kills</p>
                <p>{participant.tripleKills}</p>
              </div>
              <div>
                <p className="text-gray-400">Quadra Kills</p>
                <p>{participant.quadraKills}</p>
              </div>
              <div>
                <p className="text-gray-400">Penta Kills</p>
                <p>{participant.pentaKills}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-400">Objectives</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Turret Damage</p>
                <p>{formatNumber(participant.damageDealtToTurrets)}</p>
              </div>
              <div>
                <p className="text-gray-400">Objectives Damage</p>
                <p>{formatNumber(participant.damageDealtToObjectives)}</p>
              </div>
              <div>
                <p className="text-gray-400">Turrets Killed</p>
                <p>{participant.turretKills}</p>
              </div>
              <div>
                <p className="text-gray-400">Inhibitors Killed</p>
                <p>{participant.inhibitorKills}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Team Performance</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400">Objectives</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p>Dragons: {team.objectives.dragon.kills}</p>
                <p>Barons: {team.objectives.baron.kills}</p>
              </div>
              <div>
                <p>Towers: {team.objectives.tower.kills}</p>
                <p>Heralds: {team.objectives.riftHerald.kills}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-400">Team Stats</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p>Total Kills: {team.objectives.champion.kills}</p>
                <p>
                  First Blood: {team.objectives.champion.first ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p>First Tower: {team.objectives.tower.first ? "Yes" : "No"}</p>
                <p>
                  First Dragon: {team.objectives.dragon.first ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {timeline && (
        <MatchTimeline
          timeline={timeline}
          participantId={participant.participantId}
        />
      )}
    </div>
  );
}
