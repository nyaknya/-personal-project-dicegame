import StatsCounter from "../../StatsCounter";
import { Character } from "../../../../types";

interface SelectStatsProps {
  character: Character;
}

export default function SelectStats({ character }: SelectStatsProps) {
  return (
    <div className="select-stats">
      <StatsCounter
        key={`${character.name}-aggressive`}
        initial={character.aggressive}
      />
      <StatsCounter
        key={`${character.name}-creativity`}
        initial={character.creativity}
      />
      <StatsCounter
        key={`${character.name}-kindness`}
        initial={character.kindness}
      />
    </div>
  );
}
