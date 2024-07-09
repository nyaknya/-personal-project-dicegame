import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import { useCharacterStore } from "../../stores/useCharacterStore";
import StatsTable from "./StatsTable";
import JudgeTypeSelector from "./JudgeTypeSelector";
import TypeEditSection from "./TypeEditSection";

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
  const [result, setResult] = useState<string>("");
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

  const handleResultCheck = () => {
    const currentStat = calculateCurrentStat();
    let isSuccess = false;
    let detailedResult = "";

    if (currentStat >= requiredValue) {
      setDifficulty("안전");
      setSuccessRate("100%");
      isSuccess = true;
      detailedResult = "안전 성공! 부상이나 감염 없음.";
    } else if (currentStat >= Math.floor(requiredValue * 0.8)) {
      setDifficulty("주의");
      setSuccessRate("50%");
      isSuccess = Math.random() < 0.5;
      detailedResult = isSuccess
        ? "주의 성공! 부상이나 감염 없음."
        : handleFailure();
    } else if (currentStat >= Math.floor(requiredValue * 0.6)) {
      setDifficulty("위험");
      setSuccessRate("30%");
      isSuccess = Math.random() < 0.3;
      detailedResult = isSuccess
        ? "위험 성공! 부상이나 감염 없음."
        : handleFailure();
    } else {
      setDifficulty("위험");
      setSuccessRate("30%");
      detailedResult = handleFailure();
    }

    setResult(detailedResult);
  };

  const handleFailure = () => {
    let resultMessage = "판정 실패! ";
    const selectedParticipants = getRandomParticipants(extractedPeople);

    selectedParticipants.forEach((participant) => {
      if (participant.character) {
        if (attackType === "infection") {
          const infectionRoll = Math.random();
          if (infectionRoll < 0.4) {
            resultMessage += `${participant.character.name} -긁힘 `;
          } else if (infectionRoll < 0.4 + 0.6) {
            resultMessage += `${participant.character.name} -찢김 `;
          } else {
            resultMessage += `${participant.character.name} -물림 `;
          }
        } else {
          participant.character.current_hp -= injuryHP;
          resultMessage += `${participant.character.name} -${injuryHP} `;
        }
      }
    });

    return resultMessage;
  };

  const getRandomParticipants = (count: number) => {
    const shuffled = participants.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
        <TypeEditSection
          attackType={attackType}
          judgeType={judgeType}
          requiredValue={requiredValue}
          extractedPeople={extractedPeople}
          injuryHP={injuryHP}
          setAttackType={setAttackType}
          setJudgeType={setJudgeType}
          setRequiredValue={setRequiredValue}
          setExtractedPeople={setExtractedPeople}
          setInjuryHP={setInjuryHP}
          handleResultCheck={handleResultCheck}
        />
        <div className="trial-information">
          <p>
            난이도{" "}
            <span className={getDifficultyClass(difficulty)}>{difficulty}</span>
          </p>
          <p>
            성공확률 <span>{successRate !== "-" ? successRate : "-"}</span>
          </p>
        </div>
        <div className="trial-result-message">
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
}
