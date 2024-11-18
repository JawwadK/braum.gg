import React from "react";
import { Progress } from "@/components/ui/progress";

interface StatsBarProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  color?: string;
}

export const StatsBar = ({
  value,
  max,
  label,
  sublabel,
  color = "bg-blue-500",
}: StatsBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <span className="text-sm font-medium">
          {value.toLocaleString()}
          {sublabel && (
            <span className="text-gray-400 text-xs ml-1">({sublabel})</span>
          )}
        </span>
      </div>
      <div className="relative w-full">
        <Progress value={percentage} className={`h-2 ${color}`} />
      </div>
    </div>
  );
};

interface DamageDistributionProps {
  physical: number;
  magic: number;
  true: number;
}

export const DamageDistribution = ({
  physical,
  magic,
  true: trueDamage,
}: DamageDistributionProps) => {
  const total = physical + magic + trueDamage;
  const physicalPercent = (physical / total) * 100;
  const magicPercent = (magic / total) * 100;
  const truePercent = (trueDamage / total) * 100;

  return (
    <div className="space-y-2">
      <div className="h-4 flex rounded-full overflow-hidden">
        <div
          className="bg-orange-500"
          style={{ width: `${physicalPercent}%` }}
          title={`Physical: ${Math.round(physicalPercent)}%`}
        />
        <div
          className="bg-blue-500"
          style={{ width: `${magicPercent}%` }}
          title={`Magic: ${Math.round(magicPercent)}%`}
        />
        <div
          className="bg-white"
          style={{ width: `${truePercent}%` }}
          title={`True: ${Math.round(truePercent)}%`}
        />
      </div>
      <div className="grid grid-cols-3 text-xs">
        <div className="text-center">
          <span className="text-orange-500">■</span> Physical
          <div className="font-medium">{Math.round(physicalPercent)}%</div>
        </div>
        <div className="text-center">
          <span className="text-blue-500">■</span> Magic
          <div className="font-medium">{Math.round(magicPercent)}%</div>
        </div>
        <div className="text-center">
          <span className="text-white">■</span> True
          <div className="font-medium">{Math.round(truePercent)}%</div>
        </div>
      </div>
    </div>
  );
};

interface CircularStatProps {
  value: number;
  total: number;
  label: string;
  color?: string;
}

export const CircularStat = ({
  value,
  total,
  label,
  color = "text-blue-500",
}: CircularStatProps) => {
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{percentage}%</div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-xs text-gray-500">
        {value.toLocaleString()} / {total.toLocaleString()}
      </div>
    </div>
  );
};
