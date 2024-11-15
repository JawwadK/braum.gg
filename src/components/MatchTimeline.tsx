"use client";

import { useState } from "react";
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

interface TimelineProps {
  timeline: any;
  participantId: number;
}

export default function MatchTimeline({
  timeline,
  participantId,
}: TimelineProps) {
  const [selectedMinute, setSelectedMinute] = useState(0);

  // Process timeline data without opponent comparison for now
  const timelineData = timeline.info.frames.map((frame: any, index: number) => {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      setSelectedMinute(label);
      return (
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <p className="text-white font-bold mb-2">Minute {label}</p>
          {payload.map((entry: any) => (
            <p key={entry.dataKey} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Gold Chart */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Gold Income</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis
                dataKey="minute"
                label={{
                  value: "Minutes",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "Gold", angle: -90, position: "insideLeft" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip content={CustomTooltip} />
              <Legend />
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
        </div>
      </div>

      {/* XP Chart */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Experience Gained</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis
                dataKey="minute"
                label={{
                  value: "Minutes",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "XP", angle: -90, position: "insideLeft" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip content={CustomTooltip} />
              <Legend />
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
        </div>
      </div>

      {/* CS Chart */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Creep Score</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis
                dataKey="minute"
                label={{
                  value: "Minutes",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "CS", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend />
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
        </div>
      </div>
    </div>
  );
}
