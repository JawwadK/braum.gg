// src/types/match.ts

import { TooltipProps } from "recharts";

export interface TimelineProps {
  timeline: TimelineData;
  participantId: number;
}

export interface MatchParticipant {
  assists: number;
  baronKills: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  deaths: number;
  goldEarned: number;
  individualPosition: string;
  kills: number;
  lane: string;
  role: string;
  participantId: number;
  puuid: string;
  summonerName: string;
  teamId: number;
  totalDamageDealtToChampions: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number; // Changed from optional to required
  visionScore: number;
  win: boolean;
  gameEndedInEarlySurrender?: boolean;
  physicalDamageDealtToChampions: number;
  magicDamageDealtToChampions: number;
  trueDamageDealtToChampions: number;
  totalDamageTaken: number;
  damageSelfMitigated: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  pentaKills: number;
  quadraKills: number;
  tripleKills: number;
  doubleKills: number;
  perks: {
    styles: Array<{
      style: number;
      selections: Array<{
        perk: number;
      }>;
    }>;
    statPerks: {
      defense: number;
      flex: number;
      offense: number;
    };
  };
  [key: `item${number}`]: number;
}

export interface MatchData {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp: number;
    gameId: number;
    gameMode: string;
    participants: MatchParticipant[];
    teams: Array<{
      teamId: number;
      win: boolean;
      objectives: {
        champion: {
          kills: number;
        };
      };
    }>;
  };
}

export interface TimelineEvent {
  timestamp: number;
  type: string;
  participantId: number; // Changed from optional to required
  position?: {
    x: number;
    y: number;
  };
  killerId?: number;
  victimId?: number;
  assistingParticipantIds?: number[];
  monsterType?: string;
}

export interface TimelineFrame {
  events: TimelineEvent[];
  participantFrames: {
    [key: string]: {
      totalGold: number;
      xp: number;
      minionsKilled: number;
      jungleMinionsKilled: number;
      level: number;
      damageStats: {
        totalDamageDoneToChampions: number;
        physicalDamageDoneToChampions: number;
        magicDamageDoneToChampions: number;
        trueDamageDoneToChampions: number;
      };
    };
  };
  timestamp: number;
}

export interface TimelineData {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    frameInterval: number;
    frames: TimelineFrame[];
  };
}

export type CustomTooltipProps = TooltipProps<number, string>;

export interface MatchDetailsProps {
  match: MatchData;
  timeline: TimelineData;
  summonerPuuid: string;
}

export interface ChartData {
  minute: number;
  gold: number;
  xp: number;
  cs: number;
  level: number;
  damageStats: {
    totalDamage: number;
    physicalDamage: number;
    magicDamage: number;
    trueDamage: number;
  };
}