import React from "react";
import StatsCounter from "../../StatsCounter";
import { Character } from "../../../../types";

interface SelectStatsProps {
  character: Character;
  stats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  };
  onStatsChange: (newStats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  }) => void;
}

export default function SelectStats({
  character,
  stats,
  onStatsChange,
}: SelectStatsProps) {
  const handleStatChange = (stat: keyof typeof stats, value: number) => {
    const newStats = { ...stats, [stat]: value };
    onStatsChange(newStats);
  };

  return (
    <div className="select-stats">
      <StatsCounter
        key={`${character.name}-aggressive`}
        initial={character.aggressive}
        current={stats.aggressive}
        onStatChange={(value) => handleStatChange("aggressive", value)}
      />
      <StatsCounter
        key={`${character.name}-creativity`}
        initial={character.creativity}
        current={stats.creativity}
        onStatChange={(value) => handleStatChange("creativity", value)}
      />
      <StatsCounter
        key={`${character.name}-kindness`}
        initial={character.kindness}
        current={stats.kindness}
        onStatChange={(value) => handleStatChange("kindness", value)}
      />
    </div>
  );
}
