import { CharacterState } from "../../../types";

interface StatsTableProps {
  participants: CharacterState[];
}

export default function StatsTable({ participants }: StatsTableProps) {
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

  const calculateStandards = (currentValue: number) => {
    return {
      caution: Math.floor(currentValue * 0.8),
      danger: Math.floor(currentValue * 0.6),
    };
  };

  const aggressiveStandards = calculateStandards(currentAggressive);
  const creativityStandards = calculateStandards(currentCreativity);
  const kindnessStandards = calculateStandards(currentKindness);

  return (
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>현재 수치</th>
            <th>주의 기준</th>
            <th>위험 기준</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>호전성</td>
            <td>{currentAggressive}</td>
            <td>{aggressiveStandards.caution}</td>
            <td>{aggressiveStandards.danger}</td>
          </tr>
          <tr>
            <td>창의성</td>
            <td>{currentCreativity}</td>
            <td>{creativityStandards.caution}</td>
            <td>{creativityStandards.danger}</td>
          </tr>
          <tr>
            <td>이타성</td>
            <td>{currentKindness}</td>
            <td>{kindnessStandards.caution}</td>
            <td>{kindnessStandards.danger}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
