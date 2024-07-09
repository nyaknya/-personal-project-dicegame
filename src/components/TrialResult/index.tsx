import React, { useState } from "react";
import "./style.css";
import { useCharacterStore } from "../../stores/useCharacterStore";
import StatsTable from "./StatsTable";

export default function TrialResult() {
  const characterStates = useCharacterStore((state) => state.characterStates);
  const [requiredStats, setRequiredStats] = useState({
    aggressive: 100,
    creativity: 80,
    kindness: 60,
  });
  const [attackType, setAttackType] = useState<"injury" | "infection">(
    "injury"
  );

  const participants = characterStates.filter((state) => state.isSelected);

  const handleAttackTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttackType(event.target.value as "injury" | "infection");
  };

  return (
    <div className="trial-result">
      <StatsTable participants={participants} requiredStats={requiredStats} />
      <div className="attack-type">
        <h2>공격 유형</h2>
        <label>
          <input
            type="radio"
            value="injury"
            checked={attackType === "injury"}
            onChange={handleAttackTypeChange}
          />
          부상
        </label>
        <label>
          <input
            type="radio"
            value="infection"
            checked={attackType === "infection"}
            onChange={handleAttackTypeChange}
          />
          감염
        </label>
      </div>
    </div>
  );
}
