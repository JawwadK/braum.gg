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
  color = "bg-primary",
}: StatsBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">
          {value.toLocaleString()}
          {sublabel && (
            <span className="text-muted-foreground text-xs ml-1">
              ({sublabel})
            </span>
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
          className="bg-amber-500 transition-all"
          style={{ width: `${physicalPercent}%` }}
          title={`Physical: ${Math.round(physicalPercent)}%`}
        />
        <div
          className="bg-sky-500 transition-all"
          style={{ width: `${magicPercent}%` }}
          title={`Magic: ${Math.round(magicPercent)}%`}
        />
        <div
          className="bg-neutral-200 dark:bg-neutral-300 transition-all"
          style={{ width: `${truePercent}%` }}
          title={`True: ${Math.round(truePercent)}%`}
        />
      </div>
      <div className="grid grid-cols-3 text-xs">
        <div className="text-center">
          <span className="text-amber-500">■</span>{" "}
          <span className="text-foreground">Physical</span>
          <div className="font-medium text-muted-foreground">
            {Math.round(physicalPercent)}%
          </div>
        </div>
        <div className="text-center">
          <span className="text-sky-500">■</span>{" "}
          <span className="text-foreground">Magic</span>
          <div className="font-medium text-muted-foreground">
            {Math.round(magicPercent)}%
          </div>
        </div>
        <div className="text-center">
          <span className="dark:text-neutral-300 text-neutral-200">■</span>{" "}
          <span className="text-foreground">True</span>
          <div className="font-medium text-muted-foreground">
            {Math.round(truePercent)}%
          </div>
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
  color = "text-primary",
}: CircularStatProps) => {
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="text-center p-4 bg-card/50 rounded-lg">
      <div className={`text-2xl font-bold ${color}`}>{percentage}%</div>
      <div className="text-sm text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">
        {value.toLocaleString()} / {total.toLocaleString()}
      </div>
    </div>
  );
};
