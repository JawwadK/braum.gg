import React from "react";
import Image from "next/image";
import { DDRAGON_BASE_URL } from "@/constants";

const Scoreboard = ({
  match,
  summonerPuuid,
}: {
  match: any;
  summonerPuuid: string;
}) => {
  // Separate participants into teams
  const teams = {
    blue: match.info.participants.filter((p: any) => p.teamId === 100),
    red: match.info.participants.filter((p: any) => p.teamId === 200),
  };

  const StatCell = ({ value, label }: { value: number; label?: string }) => (
    <div className="text-center">
      <div className="font-medium text-foreground">{value}</div>
      {label && <div className="text-xs text-muted-foreground">{label}</div>}
    </div>
  );

  const TeamSection = ({
    team,
    teamName,
  }: {
    team: any[];
    teamName: string;
  }) => (
    <div className="space-y-1">
      <div className="grid grid-cols-12 gap-2 text-sm text-muted-foreground px-2">
        <div className="col-span-4">Champion</div>
        <div className="col-span-2 text-center">KDA</div>
        <div className="col-span-2 text-center">Damage</div>
        <div className="col-span-2 text-center">Gold</div>
        <div className="col-span-2 text-center">CS</div>
      </div>
      {team.map((player: any) => (
        <div
          key={player.puuid}
          className={`grid grid-cols-12 gap-2 items-center p-2 rounded ${
            player.puuid === summonerPuuid
              ? "bg-primary/20"
              : "hover:bg-accent/50 transition-colors"
          }`}
        >
          <div className="col-span-4 flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src={`${DDRAGON_BASE_URL}/img/champion/${player.championName}.png`}
                alt={player.championName}
                width={32}
                height={32}
                className="rounded"
                unoptimized
              />
              <div className="absolute -bottom-1 -right-1 bg-background text-foreground rounded-full text-xs w-4 h-4 flex items-center justify-center border border-border">
                {player.champLevel}
              </div>
            </div>
            <span className="truncate text-foreground">
              {player.summonerName}
            </span>
          </div>

          <div className="col-span-2 text-center">
            <StatCell
              value={`${player.kills}/${player.deaths}/${player.assists}`}
              label={`${(
                (player.kills + player.assists) /
                Math.max(1, player.deaths)
              ).toFixed(1)} KDA`}
            />
          </div>

          <div className="col-span-2">
            <StatCell
              value={Math.round(player.totalDamageDealtToChampions / 1000)}
              label="k"
            />
          </div>

          <div className="col-span-2">
            <StatCell value={Math.round(player.goldEarned / 1000)} label="k" />
          </div>

          <div className="col-span-2">
            <StatCell
              value={
                player.totalMinionsKilled + (player.neutralMinionsKilled || 0)
              }
              label={(
                (player.totalMinionsKilled +
                  (player.neutralMinionsKilled || 0)) /
                (match.info.gameDuration / 60)
              ).toFixed(1)}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card p-4 rounded-lg space-y-4">
      <div className="space-y-4">
        <div>
          <h3
            className={`text-sky-400 font-medium mb-2 flex items-center justify-between`}
          >
            <span>BLUE TEAM</span>
            {teams.blue[0].win && (
              <span className="text-primary text-sm font-normal">VICTORY</span>
            )}
          </h3>
          <TeamSection team={teams.blue} teamName="blue" />
        </div>
        <div className="border-t border-border pt-4">
          <h3
            className={`text-rose-400 font-medium mb-2 flex items-center justify-between`}
          >
            <span>RED TEAM</span>
            {teams.red[0].win && (
              <span className="text-primary text-sm font-normal">VICTORY</span>
            )}
          </h3>
          <TeamSection team={teams.red} teamName="red" />
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
