import { useEffect } from "react";
import { CharacterState } from "../../../types";

interface StatsTableProps {
  participants: CharacterState[];
  onStatsChange: (stats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  }) => void;
}

export default function StatsTable({
  participants,
  onStatsChange,
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

  useEffect(() => {
    onStatsChange({
      aggressive: currentAggressive,
      creativity: currentCreativity,
      kindness: currentKindness,
    });
  }, [currentAggressive, currentCreativity, currentKindness, onStatsChange]);

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
            <td>{Math.ceil(currentAggressive / 0.8)}</td>
            <td>{Math.ceil(currentAggressive / 0.6)}</td>
          </tr>
          <tr>
            <td>창의성</td>
            <td>{currentCreativity}</td>
            <td>{Math.ceil(currentCreativity / 0.8)}</td>
            <td>{Math.ceil(currentCreativity / 0.6)}</td>
          </tr>
          <tr>
            <td>이타성</td>
            <td>{currentKindness}</td>
            <td>{Math.ceil(currentKindness / 0.8)}</td>
            <td>{Math.ceil(currentKindness / 0.6)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
