"use client";

import React from "react";
import Image from "next/image";

interface RunesDisplayProps {
  primaryStyle: number;
  subStyle: number;
  selectedPerks: Array<number>;
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  };
}

interface RuneStyle {
  name: string;
  icon: string;
}

interface RuneStyles {
  [key: string]: RuneStyle;
}

interface RunePaths {
  [key: string]: string;
}

interface StatPerks {
  [key: string]: string;
}

// Main rune paths
const RUNE_STYLES: RuneStyles = {
  "8000": { name: "Precision", icon: "7201_Precision" },
  "8100": { name: "Domination", icon: "7200_Domination" },
  "8200": { name: "Sorcery", icon: "7202_Sorcery" },
  "8300": { name: "Inspiration", icon: "7203_Whimsy" },
  "8400": { name: "Resolve", icon: "7204_Resolve" },
};

// Complete rune mappings including all current runes
const RUNE_PATHS: RunePaths = {
  // Precision Keystones and Runes
  "8005": "Precision/PressTheAttack/PressTheAttack",
  "8008": "Precision/LethalTempo/LethalTempoTemp",
  "8021": "Precision/FleetFootwork/FleetFootwork",
  "8010": "Precision/Conqueror/Conqueror",
  "9101": "Precision/Overheal/Overheal",
  "9111": "Precision/Triumph/Triumph",
  "8009": "Precision/PresenceOfMind/PresenceOfMind",
  "9104": "Precision/LegendAlacrity/LegendAlacrity",
  "9105": "Precision/LegendTenacity/LegendTenacity",
  "9103": "Precision/LegendBloodline/LegendBloodline",
  "8014": "Precision/CoupDeGrace/CoupDeGrace",
  "8017": "Precision/CutDown/CutDown",
  "8299": "Precision/LastStand/LastStand",

  // Domination Keystones and Runes
  "8112": "Domination/Electrocute/Electrocute",
  "8124": "Domination/Predator/Predator",
  "8128": "Domination/DarkHarvest/DarkHarvest",
  "9923": "Domination/HailOfBlades/HailOfBlades",
  "8126": "Domination/CheapShot/CheapShot",
  "8139": "Domination/TasteOfBlood/TasteOfBlood",
  "8143": "Domination/SuddenImpact/SuddenImpact",
  "8136": "Domination/ZombieWard/ZombieWard",
  "8120": "Domination/GhostPoro/GhostPoro",
  "8138": "Domination/EyeballCollection/EyeballCollection",
  "8135": "Domination/TreasureHunter/TreasureHunter",
  "8134": "Domination/IngeniousHunter/IngeniousHunter",
  "8105": "Domination/RelentlessHunter/RelentlessHunter",
  "8106": "Domination/UltimateHunter/UltimateHunter",

  // Sorcery Keystones and Runes
  "8214": "Sorcery/SummonAery/SummonAery",
  "8229": "Sorcery/ArcaneComet/ArcaneComet",
  "8230": "Sorcery/PhaseRush/PhaseRush",
  "8224": "Sorcery/NullifyingOrb/NullifyingOrb",
  "8226": "Sorcery/ManaflowBand/ManaflowBand",
  "8275": "Sorcery/NimbusCloak/NimbusCloak",
  "8210": "Sorcery/Transcendence/Transcendence",
  "8234": "Sorcery/Celerity/Celerity",
  "8233": "Sorcery/AbsoluteFocus/AbsoluteFocus",
  "8237": "Sorcery/Scorch/Scorch",
  "8232": "Sorcery/Waterwalking/Waterwalking",
  "8236": "Sorcery/GatheringStorm/GatheringStorm",

  // Resolve Keystones and Runes
  "8437": "Resolve/GraspOfTheUndying/GraspOfTheUndying",
  "8439": "Resolve/VeteranAftershock/VeteranAftershock",
  "8465": "Resolve/Guardian/Guardian",
  "8446": "Resolve/Demolish/Demolish",
  "8463": "Resolve/FontOfLife/FontOfLife",
  "8401": "Resolve/ShieldBash/ShieldBash",
  "8429": "Resolve/Conditioning/Conditioning",
  "8444": "Resolve/SecondWind/SecondWind",
  "8473": "Resolve/BonePlating/BonePlating",
  "8451": "Resolve/Overgrowth/Overgrowth",
  "8453": "Resolve/Revitalize/Revitalize",
  "8242": "Resolve/Unflinching/Unflinching",

  // Inspiration Keystones and Runes
  "8351": "Inspiration/GlacialAugment/GlacialAugment",
  "8360": "Inspiration/UnsealedSpellbook/UnsealedSpellbook",
  "8369": "Inspiration/FirstStrike/FirstStrike",
  "8306": "Inspiration/HextechFlashtraption/HextechFlashtraption",
  "8304": "Inspiration/MagicalFootwear/MagicalFootwear",
  "8313": "Inspiration/PerfectTiming/PerfectTiming",
  "8321": "Inspiration/FuturesMarket/FuturesMarket",
  "8316": "Inspiration/MinionDematerializer/MinionDematerializer",
  "8345": "Inspiration/BiscuitDelivery/BiscuitDelivery",
  "8347": "Inspiration/CosmicInsight/CosmicInsight",
  "8410": "Inspiration/ApproachVelocity/ApproachVelocity",
  "8352": "Inspiration/TimeWarpTonic/TimeWarpTonic",
};

// Updated Stat perks with correct paths
const STAT_PERKS: StatPerks = {
  "5001": "StatMods/StatModsHealthScalingIcon",
  "5002": "StatMods/StatModsArmorIcon",
  "5003": "StatMods/StatModsMagicResIcon",
  "5005": "StatMods/StatModsAttackSpeedIcon",
  "5007": "StatMods/StatModsCDRScalingIcon",
  "5008": "StatMods/StatModsAdaptiveForceIcon",
  "5011": "StatMods/StatModsHealthScalingIcon",
};

export default function RunesDisplay({
  primaryStyle,
  subStyle,
  selectedPerks,
  statPerks,
}: RunesDisplayProps) {
  const getRuneImagePath = (runeId: number): string => {
    const basePath =
      "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/";
    const key = runeId.toString();
    if (RUNE_PATHS[key]) {
      return `${basePath}${RUNE_PATHS[key]}.png`;
    }
    console.log(`Missing rune path for ID: ${runeId}`);
    return `${basePath}Domination/DarkHarvest/DarkHarvest.png`;
  };

  const getStyleIconPath = (styleId: number): string | null => {
    const key = styleId.toString();
    if (!RUNE_STYLES[key]) {
      console.log(`Missing style for ID: ${styleId}`);
      return null;
    }
    return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${RUNE_STYLES[key].icon}.png`;
  };

  const getStatPerkImagePath = (statId: number): string | null => {
    const key = statId.toString();
    if (!STAT_PERKS[key]) {
      console.log(`Missing stat perk for ID: ${statId}`);
      return null;
    }
    return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/${STAT_PERKS[key]}.png`;
  };

  const getStyleName = (styleId: number): string => {
    const key = styleId.toString();
    return RUNE_STYLES[key]?.name || "";
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
      <div className="flex gap-6">
        {/* Primary Runes Column */}
        <div className="space-y-4">
          {/* Primary Path Header */}
          <div className="flex items-center gap-2">
            {getStyleIconPath(primaryStyle) && (
              <Image
                src={getStyleIconPath(primaryStyle)!}
                alt={getStyleName(primaryStyle)}
                width={24}
                height={24}
                className="rounded-full"
                unoptimized
              />
            )}
            <span className="text-sm font-medium text-amber-500 dark:text-yellow-400">
              {getStyleName(primaryStyle)}
            </span>
          </div>

          {/* Primary Runes */}
          <div className="space-y-3">
            {/* Keystone (larger) */}
            <div className="flex justify-center">
              <div className="p-1 bg-card/80 rounded-full">
                <Image
                  src={getRuneImagePath(selectedPerks[0])}
                  alt={`Keystone ${selectedPerks[0]}`}
                  width={52}
                  height={52}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            </div>
            {/* Other primary runes */}
            <div className="flex flex-col items-center gap-2">
              {selectedPerks.slice(1, 4).map((perkId, index) => (
                <div key={index} className="p-0.5 bg-card/80 rounded-full">
                  <Image
                    src={getRuneImagePath(perkId)}
                    alt={`Rune ${perkId}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Runes Column */}
        <div className="space-y-4">
          {/* Secondary Path Header */}
          <div className="flex items-center gap-2">
            {getStyleIconPath(subStyle) && (
              <Image
                src={getStyleIconPath(subStyle)!}
                alt={getStyleName(subStyle)}
                width={20}
                height={20}
                className="rounded-full opacity-75"
                unoptimized
              />
            )}
            <span className="text-sm text-muted-foreground">
              {getStyleName(subStyle)}
            </span>
          </div>

          {/* Secondary Runes */}
          <div className="flex flex-col items-center gap-3 mt-[68px]">
            {selectedPerks.slice(4).map((perkId, index) => (
              <div key={index} className="p-0.5 bg-card/80 rounded-full">
                <Image
                  src={getRuneImagePath(perkId)}
                  alt={`Rune ${perkId}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Shards */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-center gap-4">
          {[statPerks.offense, statPerks.flex, statPerks.defense].map(
            (statId, index) => {
              const statImagePath = getStatPerkImagePath(statId);
              return statImagePath ? (
                <div key={index} className="p-0.5 bg-card/80 rounded-full">
                  <Image
                    src={statImagePath}
                    alt={`Stat ${statId}`}
                    width={20}
                    height={20}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full bg-secondary"
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
