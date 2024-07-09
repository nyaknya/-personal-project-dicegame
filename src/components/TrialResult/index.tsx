import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import { useCharacterStore } from "../../stores/useCharacterStore";
import StatsTable from "./StatsTable";
import JudgeTypeSelector from "./JudgeTypeSelector";

export default function TrialResult() {
  const characterStates = useCharacterStore((state) => state.characterStates);
  const [attackType, setAttackType] = useState<"injury" | "infection">(
    "injury"
  );
  const [judgeType, setJudgeType] = useState<string>("호전성");
  const [requiredValue, setRequiredValue] = useState<number>(0);
  const [extractedPeople, setExtractedPeople] = useState<number>(0);
  const [injuryHP, setInjuryHP] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("-");
  const [successRate, setSuccessRate] = useState<string>("-");
  const [currentStats, setCurrentStats] = useState<{
    aggressive: number;
    creativity: number;
    kindness: number;
  }>({
    aggressive: 0,
    creativity: 0,
    kindness: 0,
  });

  const participants = characterStates.filter((state) => state.isSelected);

  const handleAttackTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttackType(event.target.value as "injury" | "infection");
  };

  const handleRequiredValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequiredValue(parseInt(event.target.value));
  };

  const handleExtractedPeopleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExtractedPeople(parseInt(event.target.value));
  };

  const handleInjuryHPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInjuryHP(parseInt(event.target.value));
  };

  const handleResultCheck = () => {
    // 결과 측정 로직 구현
  };

  const calculateCurrentStat = useCallback(() => {
    return judgeType === "호전성"
      ? currentStats.aggressive
      : judgeType === "창의성"
      ? currentStats.creativity
      : currentStats.kindness;
  }, [currentStats, judgeType]);

  useEffect(() => {
    const currentStat = calculateCurrentStat();

    if (isNaN(requiredValue) || requiredValue <= 0) {
      setDifficulty("-");
      setSuccessRate("-");
    } else if (currentStat >= requiredValue) {
      setDifficulty("안전");
      setSuccessRate("100%");
    } else if (currentStat >= Math.floor(requiredValue * 0.8)) {
      setDifficulty("주의");
      setSuccessRate("50%");
    } else if (currentStat >= Math.floor(requiredValue * 0.6)) {
      setDifficulty("위험");
      setSuccessRate("30%");
    } else {
      setDifficulty("위험");
      setSuccessRate("30%");
    }
  }, [requiredValue, calculateCurrentStat]);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "안전":
        return "safe";
      case "주의":
        return "caution";
      case "위험":
        return "danger";
      default:
        return "";
    }
  };

  return (
    <div className="trial-result">
      <StatsTable participants={participants} onStatsChange={setCurrentStats} />
      <div>
        <div className="edit-field">
          <div className="type-edit">
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
            <div className="judge-section">
              <div className="judge-type">
                <h2>판정 유형</h2>
                <JudgeTypeSelector
                  judgeType={judgeType}
                  setJudgeType={setJudgeType}
                />
              </div>
              <div className="input-field">
                <h2>요구치</h2>
                <input
                  type="number"
                  value={requiredValue}
                  onChange={handleRequiredValueChange}
                  placeholder="요구치"
                />
              </div>
              <div className="input-field">
                <h2>벌칙 인원</h2>
                <input
                  type="number"
                  value={extractedPeople}
                  onChange={handleExtractedPeopleChange}
                  placeholder="인원"
                />
              </div>
              <div className="input-field">
                <h2>부상 HP</h2>
                <input
                  type="number"
                  value={injuryHP}
                  onChange={handleInjuryHPChange}
                  placeholder="부상 HP"
                />
              </div>
              <button className="result-button" onClick={handleResultCheck}>
                결과 측정
              </button>
            </div>
          </div>
        </div>
        <div className="trial-information">
          <p>
            난이도{" "}
            <span className={getDifficultyClass(difficulty)}>{difficulty}</span>
          </p>
          <p>
            성공확률 <span>{successRate !== "-" ? successRate : "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
