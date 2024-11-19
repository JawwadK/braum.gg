import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { StatsBar, DamageDistribution, CircularStat } from "./StatsDisplays";
import MatchTimeline from "./MatchTimeline";
import Scoreboard from "./Scoreboard";
import RunesDisplay from "./RunesDisplay";
import Image from "next/image";
import { DDRAGON_BASE_URL } from "@/constants";

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
      <div className="bg-card p-6 rounded-lg">
        <p className="text-destructive">Participant data not found</p>
      </div>
    );
  }

  const team = match?.info?.teams?.find(
    (t: any) => t.teamId === participant.teamId
  );

  if (!team) {
    return (
      <div className="bg-card p-6 rounded-lg">
        <p className="text-destructive">Team data not found</p>
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
      {/* Overview Panel - Always visible */}
      <div className="bg-card p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <Image
            src={`${DDRAGON_BASE_URL}/img/champion/${participant.championName}.png`}
            alt={participant.championName}
            width={64}
            height={64}
            className="rounded"
            unoptimized
          />
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {participant.championName}
            </h2>
            <p className="text-muted-foreground">
              {participant.kills}/{participant.deaths}/{participant.assists} KDA
            </p>
            <p
              className={`text-sm ${
                participant.win ? "text-primary" : "text-destructive"
              }`}
            >
              {participant.win ? "Victory" : "Defeat"} -{" "}
              {Math.floor(match.info.gameDuration / 60)}m{" "}
              {match.info.gameDuration % 60}s
            </p>
          </div>
        </div>
      </div>

      {/* Tab System */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scoreboard">Scoreboard</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Performance Stats */}
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                Performance
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {/* Each stat card with truncated labels and fixed heights for each section */}
                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    {" "}
                    {/* Fixed height for title + main value */}
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      KDA
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {participant.kills}/{participant.deaths}/
                      {participant.assists}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(
                      (participant.kills + participant.assists) /
                      Math.max(1, participant.deaths)
                    ).toFixed(2)}{" "}
                    KDA
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      Participation
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {formatPercent(killParticipation)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {totalTeamKills} team kills
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      Vision Score
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {participant.visionScore}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(
                      participant.visionScore /
                      (match.info.gameDuration / 60)
                    ).toFixed(1)}{" "}
                    per min
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      CS
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {participant.totalMinionsKilled +
                        participant.neutralMinionsKilled}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(
                      (participant.totalMinionsKilled +
                        participant.neutralMinionsKilled) /
                      (match.info.gameDuration / 60)
                    ).toFixed(1)}{" "}
                    per min
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      Damage Share
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {formatPercent(damageShare)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(participant.totalDamageDealtToChampions)}{" "}
                    total
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      Objectives
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {formatNumber(participant.damageDealtToObjectives)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(participant.damageDealtToTurrets)} to turrets
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      Survival
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {formatPercent(
                        (participant.damageSelfMitigated /
                          (participant.damageSelfMitigated +
                            participant.totalDamageTaken)) *
                          100
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    damage mitigated
                  </p>
                </div>

                <div className="flex flex-col h-[88px]">
                  <div className="h-14">
                    <p className="text-sm text-muted-foreground truncate mb-1.5">
                      Gold Share
                    </p>
                    <p className="text-xl text-foreground font-medium">
                      {formatPercent(
                        (participant.goldEarned /
                          match.info.participants
                            .filter((p: any) => p.teamId === participant.teamId)
                            .reduce(
                              (sum: number, p: any) => sum + p.goldEarned,
                              0
                            )) *
                          100
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(participant.goldEarned)} total
                  </p>
                </div>
              </div>

              {/* Combat Achievements - no changes needed here */}
              {(participant.pentaKills > 0 ||
                participant.quadraKills > 0 ||
                participant.tripleKills > 0 ||
                participant.doubleKills > 0) && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {participant.pentaKills > 0 && (
                      <div className="px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        {participant.pentaKills} Penta Kill
                        {participant.pentaKills > 1 ? "s" : ""}
                      </div>
                    )}
                    {participant.quadraKills > 0 && (
                      <div className="px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        {participant.quadraKills} Quadra Kill
                        {participant.quadraKills > 1 ? "s" : ""}
                      </div>
                    )}
                    {participant.tripleKills > 0 && (
                      <div className="px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        {participant.tripleKills} Triple Kill
                        {participant.tripleKills > 1 ? "s" : ""}
                      </div>
                    )}
                    {participant.doubleKills > 0 && (
                      <div className="px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        {participant.doubleKills} Double Kill
                        {participant.doubleKills > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Build and Runes Section */}
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Build & Runes
              </h3>
              <div className="space-y-4">
                {/* Items */}
                <div className="grid grid-cols-3 gap-2">
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
                      <div key={i} className="w-10 h-10 bg-secondary rounded" />
                    );
                  })}
                </div>

                {/* Runes */}
                <RunesDisplay
                  primaryStyle={participant.perks.styles[0].style}
                  subStyle={participant.perks.styles[1].style}
                  selectedPerks={[
                    ...participant.perks.styles[0].selections.map(
                      (s: any) => s.perk
                    ),
                    ...participant.perks.styles[1].selections.map(
                      (s: any) => s.perk
                    ),
                  ]}
                  statPerks={{
                    defense: participant.perks.statPerks.defense,
                    flex: participant.perks.statPerks.flex,
                    offense: participant.perks.statPerks.offense,
                  }}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Scoreboard Tab */}
        <TabsContent value="scoreboard">
          <Scoreboard match={match} summonerPuuid={summonerPuuid} />
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Damage Stats */}
            <div className="bg-card p-6 rounded-lg space-y-6">
              <h3 className="text-xl font-bold text-foreground">Damage</h3>

              {/* Total Damage */}
              <div className="space-y-4">
                <StatsBar
                  label="Damage to Champions"
                  value={participant.totalDamageDealtToChampions}
                  max={match.info.participants.reduce(
                    (max: number, p: any) =>
                      Math.max(max, p.totalDamageDealtToChampions),
                    0
                  )}
                  sublabel={`${formatPercent(damageShare)} of team damage`}
                  color="bg-purple-500"
                />

                <h4 className="text-sm font-medium text-muted-foreground mt-4">
                  Damage Distribution
                </h4>
                <DamageDistribution
                  physical={participant.physicalDamageDealtToChampions}
                  magic={participant.magicDamageDealtToChampions}
                  true={participant.trueDamageDealtToChampions}
                />
              </div>

              {/* Damage Taken */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Damage Taken & Mitigated
                </h4>
                <StatsBar
                  label="Damage Taken"
                  value={participant.totalDamageTaken}
                  max={match.info.participants.reduce(
                    (max: number, p: any) => Math.max(max, p.totalDamageTaken),
                    0
                  )}
                  color="bg-destructive"
                />
                <StatsBar
                  label="Damage Mitigated"
                  value={participant.damageSelfMitigated}
                  max={match.info.participants.reduce(
                    (max: number, p: any) =>
                      Math.max(max, p.damageSelfMitigated),
                    0
                  )}
                  color="bg-emerald-500"
                />
              </div>
            </div>

            {/* Combat Stats */}
            <div className="bg-card p-6 rounded-lg space-y-6">
              <h3 className="text-xl font-bold text-foreground">Combat</h3>

              <div className="grid grid-cols-2 gap-4">
                <CircularStat
                  value={participant.kills + participant.assists}
                  total={totalTeamKills}
                  label="Kill Participation"
                  color="text-emerald-500"
                />
                <CircularStat
                  value={participant.visionScore}
                  total={match.info.participants.reduce(
                    (max: number, p: any) => Math.max(max, p.visionScore),
                    0
                  )}
                  label="Vision Score"
                  color="text-amber-500"
                />
              </div>

              <div className="space-y-4">
                <StatsBar
                  label="CS"
                  value={
                    participant.totalMinionsKilled +
                    (participant.neutralMinionsKilled || 0)
                  }
                  max={match.info.participants.reduce(
                    (max: number, p: any) =>
                      Math.max(
                        max,
                        p.totalMinionsKilled + (p.neutralMinionsKilled || 0)
                      ),
                    0
                  )}
                  sublabel={`${(
                    (participant.totalMinionsKilled +
                      (participant.neutralMinionsKilled || 0)) /
                    (match.info.gameDuration / 60)
                  ).toFixed(1)} per min`}
                  color="bg-amber-500"
                />

                <StatsBar
                  label="Gold Earned"
                  value={participant.goldEarned}
                  max={match.info.participants.reduce(
                    (max: number, p: any) => Math.max(max, p.goldEarned),
                    0
                  )}
                  sublabel={`${(
                    participant.goldEarned /
                    (match.info.gameDuration / 60)
                  ).toFixed(0)} per min`}
                  color="bg-yellow-400"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          {timeline && (
            <MatchTimeline
              timeline={timeline}
              participantId={participant.participantId}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
