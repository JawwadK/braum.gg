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

// Main rune paths (unchanged)
const RUNE_STYLES = {
  8000: { name: "Precision", icon: "7201_Precision" },
  8100: { name: "Domination", icon: "7200_Domination" },
  8200: { name: "Sorcery", icon: "7202_Sorcery" },
  8300: { name: "Inspiration", icon: "7203_Whimsy" },
  8400: { name: "Resolve", icon: "7204_Resolve" },
};

// All rune mappings including keystones and secondary runes
const RUNE_PATHS = {
  // Precision Keystones
  8005: "Precision/PressTheAttack/PressTheAttack",
  8008: "Precision/LethalTempo/LethalTempoTemp",
  8021: "Precision/FleetFootwork/FleetFootwork",
  8010: "Precision/Conqueror/Conqueror",

  // Precision Secondary Runes
  8009: "Precision/PresenceOfMind/PresenceOfMind",
  9103: "Precision/LegendBloodline/LegendBloodline",
  8014: "Precision/CoupDeGrace/CoupDeGrace",

  // Domination Keystones
  8112: "Domination/Electrocute/Electrocute",
  8124: "Domination/Predator/Predator",
  8128: "Domination/DarkHarvest/DarkHarvest",
  8126: "Domination/HailOfBlades/HailOfBlades",

  // Sorcery Keystones
  8214: "Sorcery/SummonAery/SummonAery",
  8229: "Sorcery/ArcaneComet/ArcaneComet",
  8230: "Sorcery/PhaseRush/PhaseRush",

  // Sorcery Secondary Runes
  8233: "Sorcery/AbsoluteFocus/AbsoluteFocus",
  8236: "Sorcery/GatheringStorm/GatheringStorm",

  // Resolve Keystones
  8437: "Resolve/GraspOfTheUndying/GraspOfTheUndying",
  8439: "Resolve/VeteranAftershock/VeteranAftershock",
  8465: "Resolve/Guardian/Guardian",

  // Inspiration Keystones
  8351: "Inspiration/GlacialAugment/GlacialAugment",
  8360: "Inspiration/UnsealedSpellbook/UnsealedSpellbook",
  8369: "Inspiration/FirstStrike/FirstStrike",
};

// Stat perk mappings (unchanged)
const STAT_PERKS = {
  5001: "StatMods/StatModsHealthScalingIcon",
  5002: "StatMods/StatModsArmorIcon",
  5003: "StatMods/StatModsMagicResIcon",
  5005: "StatMods/StatModsAttackSpeedIcon",
  5007: "StatMods/StatModsCDRScalingIcon",
  5008: "StatMods/StatModsAdaptiveForceIcon",
};

export default function RunesDisplay({
  primaryStyle,
  subStyle,
  selectedPerks,
  statPerks,
}: RunesDisplayProps) {
  const getRuneImagePath = (runeId: number) => {
    const basePath =
      "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/";
    if (RUNE_PATHS[runeId]) {
      return `${basePath}${RUNE_PATHS[runeId]}.png`;
    }
    console.log(`Missing rune path for ID: ${runeId}`);
    return `${basePath}${runeId}.png`;
  };

  const getStyleIconPath = (styleId: number) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${RUNE_STYLES[styleId]?.icon}.png`;
  };

  // Split perks into primary and secondary
  const primaryPerks = selectedPerks.slice(0, 4); // First 4 perks are primary
  const secondaryPerks = selectedPerks.slice(4); // Last 2 perks are secondary

  return (
    <div className="bg-gray-800/50 rounded-lg p-4">
      <div className="flex gap-6">
        {/* Primary Runes Column */}
        <div className="space-y-4">
          {/* Primary Path Header */}
          <div className="flex items-center gap-2">
            <Image
              src={getStyleIconPath(primaryStyle)}
              alt={RUNE_STYLES[primaryStyle]?.name || ""}
              width={24}
              height={24}
              className="rounded-full"
              unoptimized
            />
            <span className="text-sm font-medium text-yellow-400">
              {RUNE_STYLES[primaryStyle]?.name}
            </span>
          </div>

          {/* Primary Runes */}
          <div className="space-y-3">
            {/* Keystone (larger) */}
            <div className="flex justify-center">
              <Image
                src={getRuneImagePath(primaryPerks[0])}
                alt={`Keystone ${primaryPerks[0]}`}
                width={52}
                height={52}
                className="rounded-full"
                unoptimized
              />
            </div>
            {/* Other primary runes */}
            <div className="flex flex-col items-center gap-2">
              {primaryPerks.slice(1).map((perkId, index) => (
                <Image
                  key={index}
                  src={getRuneImagePath(perkId)}
                  alt={`Rune ${perkId}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Runes Column */}
        <div className="space-y-4">
          {/* Secondary Path Header */}
          <div className="flex items-center gap-2">
            <Image
              src={getStyleIconPath(subStyle)}
              alt={RUNE_STYLES[subStyle]?.name || ""}
              width={20}
              height={20}
              className="rounded-full opacity-75"
              unoptimized
            />
            <span className="text-sm text-gray-400">
              {RUNE_STYLES[subStyle]?.name}
            </span>
          </div>

          {/* Secondary Runes */}
          <div className="flex flex-col items-center gap-3 mt-[68px]">
            {" "}
            {/* Added margin to align with primary runes */}
            {secondaryPerks.map((perkId, index) => (
              <Image
                key={index}
                src={getRuneImagePath(perkId)}
                alt={`Rune ${perkId}`}
                width={32}
                height={32}
                className="rounded-full"
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stat Shards */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex justify-center gap-4">
          {[statPerks.offense, statPerks.flex, statPerks.defense].map(
            (statId, index) => (
              <Image
                key={index}
                src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/${STAT_PERKS[statId]}.png`}
                alt={`Stat ${statId}`}
                width={20}
                height={20}
                className="rounded-full"
                unoptimized
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
