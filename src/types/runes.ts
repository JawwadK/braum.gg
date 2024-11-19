// src/types/runes.ts

export interface RuneStyle {
  name: string;
  icon: string;
}

export interface RuneStyles {
  [key: number]: RuneStyle;
}

export interface RunePaths {
  [key: number]: string;
}

export interface StatPerks {
  [key: number]: string;
}

export const RUNE_STYLES: RuneStyles = {
  8000: { name: "Precision", icon: "7201_Precision" },
  8100: { name: "Domination", icon: "7200_Domination" },
  8200: { name: "Sorcery", icon: "7202_Sorcery" },
  8300: { name: "Inspiration", icon: "7203_Whimsy" },
  8400: { name: "Resolve", icon: "7204_Resolve" },
};

export const RUNE_PATHS: RunePaths = {
  8005: "Precision/PressTheAttack/PressTheAttack",
  8008: "Precision/LethalTempo/LethalTempoTemp",
  8021: "Precision/FleetFootwork/FleetFootwork",
  8010: "Precision/Conqueror/Conqueror",
  9101: "Precision/Overheal/Overheal",
  9111: "Precision/Triumph/Triumph",
  8009: "Precision/PresenceOfMind/PresenceOfMind",
  9104: "Precision/LegendAlacrity/LegendAlacrity",
  9105: "Precision/LegendTenacity/LegendTenacity",
  9103: "Precision/LegendBloodline/LegendBloodline",
  8014: "Precision/CoupDeGrace/CoupDeGrace",
  8017: "Precision/CutDown/CutDown",
  8299: "Precision/LastStand/LastStand",
  // Add all your rune paths here...
};

export const STAT_PERKS: StatPerks = {
  5001: "StatMods/StatModsHealthScalingIcon",
  5002: "StatMods/StatModsArmorIcon",
  5003: "StatMods/StatModsMagicResIcon",
  5005: "StatMods/StatModsAttackSpeedIcon",
  5007: "StatMods/StatModsCDRScalingIcon",
  5008: "StatMods/StatModsAdaptiveForceIcon",
  5011: "StatMods/StatModsHealthScalingIcon",
};