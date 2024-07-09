import { CharacterState } from "../../../types";

interface StatsTableProps {
  participants: CharacterState[];
  requiredStats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  };
}

export default function StatsTable({
  participants,
  requiredStats,
}: StatsTableProps) {
  const calculateStatsSum = (
    participants: CharacterState[],
    statType: "aggressive" | "creativity" | "kindness"
  ) => {
    return participants.reduce((sum, participant) => {
      return sum + (participant.stats[statType] || 0);
    }, 0);
  };

  const currentAggressive = calculateStatsSum(participants, "aggressive");
  const currentCreativity = calculateStatsSum(participants, "creativity");
  const currentKindness = calculateStatsSum(participants, "kindness");

  const calculateStandard = (requiredValue: number) => {
    return {
      safe: requiredValue,
      caution: requiredValue * 0.8,
      danger: requiredValue * 0.6,
    };
  };

  const aggressiveStandard = calculateStandard(requiredStats.aggressive);
  const creativityStandard = calculateStandard(requiredStats.creativity);
  const kindnessStandard = calculateStandard(requiredStats.kindness);

  return (
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>현재 수치</th>
            <th>안전 기준</th>
            <th>주의 기준</th>
            <th>위험 기준</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>호전성</td>
            <td>{currentAggressive}</td>
            <td>{aggressiveStandard.safe}</td>
            <td>{aggressiveStandard.caution}</td>
            <td>{aggressiveStandard.danger}</td>
          </tr>
          <tr>
            <td>창의성</td>
            <td>{currentCreativity}</td>
            <td>{creativityStandard.safe}</td>
            <td>{creativityStandard.caution}</td>
            <td>{creativityStandard.danger}</td>
          </tr>
          <tr>
            <td>이타성</td>
            <td>{currentKindness}</td>
            <td>{kindnessStandard.safe}</td>
            <td>{kindnessStandard.caution}</td>
            <td>{kindnessStandard.danger}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
