"use client";

import { Skull, Sword, Tower, Dragon, Crown } from "lucide-react";

interface EventMarkerProps {
  type: string;
  cx: number;
  cy: number;
  payload: any;
}

export default function EventMarker({
  type,
  cx,
  cy,
  payload,
}: EventMarkerProps) {
  const getIcon = () => {
    switch (type) {
      case "CHAMPION_KILL":
        return <Skull className="w-4 h-4 text-red-500" />;
      case "ELITE_MONSTER_KILL":
        return payload.monsterType === "DRAGON" ? (
          <Dragon className="w-4 h-4 text-purple-500" />
        ) : (
          <Crown className="w-4 h-4 text-yellow-500" />
        );
      case "BUILDING_KILL":
        return <Tower className="w-4 h-4 text-orange-500" />;
      default:
        return <Sword className="w-4 h-4 text-white" />;
    }
  };

  return <g transform={`translate(${cx - 8},${cy - 8})`}>{getIcon()}</g>;
}
