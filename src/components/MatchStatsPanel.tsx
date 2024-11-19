"use client";

interface StatsPanelProps {
  playerStats: any;
  opponentStats: any;
  _minute: number;
}

export default function StatsPanel({
  playerStats,
  opponentStats,
  _minute, // Prefixed with underscore since it's not used
}: StatsPanelProps) {
  const calculateDiff = (player: number, opponent: number) => {
    const diff = player - opponent;
    return {
      value: Math.abs(diff),
      color:
        diff > 0
          ? "text-green-500"
          : diff < 0
          ? "text-red-500"
          : "text-gray-400",
      prefix: diff > 0 ? "+" : diff < 0 ? "-" : "",
    };
  };

  const stats = [
    {
      label: "Gold",
      player: playerStats.gold,
      opponent: opponentStats.gold,
      format: (value: number) => `${(value / 1000).toFixed(1)}k`,
    },
    {
      label: "CS",
      player: playerStats.cs,
      opponent: opponentStats.cs,
      format: (value: number) => value.toString(),
    },
    {
      label: "XP",
      player: playerStats.xp,
      opponent: opponentStats.xp,
      format: (value: number) => `${(value / 1000).toFixed(1)}k`,
    },
    {
      label: "Damage",
      player: playerStats.damageStats.totalDamage,
      opponent: opponentStats.damageStats.totalDamage,
      format: (value: number) => `${(value / 1000).toFixed(1)}k`,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 bg-gray-900 p-4 rounded-lg">
      {stats.map((stat) => {
        const diff = calculateDiff(stat.player, stat.opponent);
        return (
          <div key={stat.label} className="text-center">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-lg font-bold">{stat.format(stat.player)}</p>
            <p className={`text-sm ${diff.color}`}>
              {diff.prefix}
              {stat.format(diff.value)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
