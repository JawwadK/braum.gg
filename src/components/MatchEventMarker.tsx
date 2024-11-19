import { Skull, Sword, Castle, Shield, Crown } from "lucide-react";
import type { TimelineEvent } from "@/types/match";

interface EventMarkerProps {
  type: string;
  cx: number;
  cy: number;
  payload: TimelineEvent;
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
          <Shield className="w-4 h-4 text-purple-500" />
        ) : (
          <Crown className="w-4 h-4 text-yellow-500" />
        );
      case "BUILDING_KILL":
        return <Castle className="w-4 h-4 text-orange-500" />;
      default:
        return <Sword className="w-4 h-4 text-white" />;
    }
  };

  return <g transform={`translate(${cx - 8},${cy - 8})`}>{getIcon()}</g>;
}
