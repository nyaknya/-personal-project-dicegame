import StatsCounter from "../../StatsCounter";
import { Character } from "../../../../types";

interface SelectStatsProps {
  character: Character;
  stats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  };
}

export default function SelectStats({ character, stats }: SelectStatsProps) {
  return (
    <div className="select-stats">
      <StatsCounter
        key={`${character.name}-aggressive`}
        initial={character.aggressive}
        current={stats.aggressive}
      />
      <StatsCounter
        key={`${character.name}-creativity`}
        initial={character.creativity}
        current={stats.creativity}
      />
      <StatsCounter
        key={`${character.name}-kindness`}
        initial={character.kindness}
        current={stats.kindness}
      />
    </div>
  );
}
