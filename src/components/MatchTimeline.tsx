import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type {
  TimelineProps,
  CustomTooltipProps,
  ChartData,
} from "@/types/match";




export default function MatchTimeline({
  timeline,
  participantId,
}: TimelineProps) {

  // Process timeline data
  const timelineData: ChartData[] = timeline.info.frames.map((frame, index) => {
    const participant = frame.participantFrames[participantId];
    return {
      minute: index,
      gold: participant.totalGold,
      xp: participant.xp,
      cs: participant.minionsKilled + participant.jungleMinionsKilled,
      level: participant.level,
      damageStats: {
        totalDamage: participant.damageStats?.totalDamageDoneToChampions || 0,
        physicalDamage:
          participant.damageStats?.physicalDamageDoneToChampions || 0,
        magicDamage: participant.damageStats?.magicDamageDoneToChampions || 0,
        trueDamage: participant.damageStats?.trueDamageDoneToChampions || 0,
      },
    };
  });

    const CustomTooltip: React.FC<CustomTooltipProps> = ({
      active,
      payload,
      label,
    }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-card p-3 rounded border border-border">
            <p className="text-foreground font-bold mb-2">Minute {label}</p>
            {payload.map((entry) => (
              <p key={entry.dataKey} className="text-foreground">
                <span style={{ color: entry.color }}>{entry.name}</span>:{" "}
                {entry.value?.toLocaleString() ?? 0}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

  const ChartContainer = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-card p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-foreground">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Gold Chart */}
      <ChartContainer title="Gold Income">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="minute"
              label={{
                value: "Minutes",
                position: "insideBottom",
                offset: -5,
                className: "text-foreground",
              }}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              label={{
                value: "Gold",
                angle: -90,
                position: "insideLeft",
                className: "text-foreground",
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip content={CustomTooltip} />
            <Legend className="text-muted-foreground" />
            <Line
              type="monotone"
              dataKey="gold"
              stroke="#FFD700"
              name="Gold"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* XP Chart */}
      <ChartContainer title="Experience Gained">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="minute"
              label={{
                value: "Minutes",
                position: "insideBottom",
                offset: -5,
                className: "text-foreground",
              }}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              label={{
                value: "XP",
                angle: -90,
                position: "insideLeft",
                className: "text-foreground",
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip content={CustomTooltip} />
            <Legend className="text-muted-foreground" />
            <Line
              type="monotone"
              dataKey="xp"
              stroke="#7B68EE"
              name="Experience"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* CS Chart */}
      <ChartContainer title="Creep Score">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="minute"
              label={{
                value: "Minutes",
                position: "insideBottom",
                offset: -5,
                className: "text-foreground",
              }}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              label={{
                value: "CS",
                angle: -90,
                position: "insideLeft",
                className: "text-foreground",
              }}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip content={CustomTooltip} />
            <Legend className="text-muted-foreground" />
            <Line
              type="monotone"
              dataKey="cs"
              stroke="#98FB98"
              name="CS"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Damage Chart */}
      <ChartContainer title="Damage to Champions">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="minute"
              label={{
                value: "Minutes",
                position: "insideBottom",
                offset: -5,
                className: "text-foreground",
              }}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              label={{
                value: "Damage",
                angle: -90,
                position: "insideLeft",
                className: "text-foreground",
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip content={CustomTooltip} />
            <Legend className="text-muted-foreground" />
            <Line
              type="monotone"
              dataKey="damageStats.totalDamage"
              stroke="#FF4444"
              name="Total Damage"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="damageStats.physicalDamage"
              stroke="#FFD700"
              name="Physical"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="damageStats.magicDamage"
              stroke="#7B68EE"
              name="Magic"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="damageStats.trueDamage"
              stroke="#FFFFFF"
              name="True"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Level Chart */}
      <ChartContainer title="Champion Level">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="minute"
              label={{
                value: "Minutes",
                position: "insideBottom",
                offset: -5,
                className: "text-foreground",
              }}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              label={{
                value: "Level",
                angle: -90,
                position: "insideLeft",
                className: "text-foreground",
              }}
              domain={[1, 18]}
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <Tooltip content={CustomTooltip} />
            <Legend className="text-muted-foreground" />
            <Line
              type="stepAfter"
              dataKey="level"
              stroke="#4CAF50"
              name="Level"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
