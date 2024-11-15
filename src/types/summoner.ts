// src/types/summoner.ts

export interface SummonerResponse {
  summoner: Summoner;
  ranked: RankedInfo[];
  matches: MatchData[];
}

export interface Summoner {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

export interface RankedInfo {
  leagueId: string;
  summonerId: string;
  summonerName: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
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
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: MatchParticipant[];
    teams: TeamData[];
  };
}

export interface MatchParticipant {
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  deaths: number;
  kills: number;
  participantId: number;
  puuid: string;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner2Casts: number;
  teamId: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalMinionsKilled: number;
  tripleKills: number;
  quadraKills: number;
  pentaKills: number;
  visionScore: number;
  win: boolean;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

export interface TeamData {
  teamId: number;
  win: boolean;
  objectives: {
    baron: ObjectiveData;
    champion: ObjectiveData;
    dragon: ObjectiveData;
    riftHerald: ObjectiveData;
    tower: ObjectiveData;
  };
}

interface ObjectiveData {
  first: boolean;
  kills: number;
}

export interface MatchTimelineData {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    frameInterval: number;
    frames: TimelineFrame[];
  };
}

export interface TimelineFrame {
  events: TimelineEvent[];
  participantFrames: {
    [key: string]: {
      championStats: {
        abilityHaste: number;
        abilityPower: number;
        armor: number;
        armorPen: number;
        attackDamage: number;
        attackSpeed: number;
        bonusArmorPen: number;
        bonusMagicPen: number;
        ccReduction: number;
        cooldownReduction: number;
        health: number;
        healthMax: number;
        healthRegen: number;
        lifesteal: number;
        magicPen: number;
        magicResist: number;
        movementSpeed: number;
        omnivamp: number;
        physicalVamp: number;
        power: number;
        powerMax: number;
        powerRegen: number;
        spellVamp: number;
      };
      currentGold: number;
      damageStats: {
        magicDamageDone: number;
        magicDamageDoneToChampions: number;
        magicDamageTaken: number;
        physicalDamageDone: number;
        physicalDamageDoneToChampions: number;
        physicalDamageTaken: number;
        totalDamageDone: number;
        totalDamageDoneToChampions: number;
        totalDamageTaken: number;
        trueDamageDone: number;
        trueDamageDoneToChampions: number;
        trueDamageTaken: number;
      };
      jungleMinionsKilled: number;
      level: number;
      minionsKilled: number;
      participantId: number;
      position: {
        x: number;
        y: number;
      };
      timeEnemySpentControlled: number;
      totalGold: number;
      xp: number;
    };
  };
  timestamp: number;
}

export interface TimelineEvent {
  timestamp: number;
  type: string;
  participantId?: number;
  levelUpType?: string;
  skillSlot?: number;
  creatorId?: number;
  wardType?: string;
  level?: number;
  position?: {
    x: number;
    y: number;
  };
  killerId?: number;
  victimId?: number;
  assistingParticipantIds?: number[];
  bounty?: number;
  killStreakLength?: number;
  shutdownBounty?: number;
  itemId?: number;
  afterId?: number;
  beforeId?: number;
  goldGain?: number;
  killType?: string;
  laneType?: string;
  teamId?: number;
  buildingType?: string;
  towerType?: string;
  monsterType?: string;
  monsterSubType?: string;
}