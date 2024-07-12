import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import { useCharacterStore } from "../../stores/useCharacterStore";
import StatsTable from "./StatsTable";
import TypeEditSection from "./TypeEditSection";
import TrialResultMessage from "./TrialResultMessage";

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
  const [detailedResult, setDetailedResult] = useState<string>("");
  const [copyResult, setCopyResult] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [excludeBite, setExcludeBite] = useState<boolean>(false);
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
    let resultMessage = "";

    if (currentStat >= requiredValue) {
      setDifficulty("안전");
      setSuccessRate("100%");
      isSuccess = true;
      resultMessage = "안전 성공! 부상이나 감염 없음.";
      setCopyResult("");
    } else if (currentStat >= Math.floor(requiredValue * 0.8)) {
      setDifficulty("주의");
      setSuccessRate("50%");
      isSuccess = Math.random() < 0.5;
      resultMessage = isSuccess
        ? "주의 성공! 부상이나 감염 없음."
        : handleFailure();
    } else if (currentStat >= Math.floor(requiredValue * 0.6)) {
      setDifficulty("위험");
      setSuccessRate("30%");
      isSuccess = Math.random() < 0.3;
      resultMessage = isSuccess
        ? "위험 성공! 부상이나 감염 없음."
        : handleFailure();
    } else {
      setDifficulty("위험");
      setSuccessRate("30%");
      resultMessage = handleFailure();
    }

    setDetailedResult(resultMessage);
    setIsSuccess(isSuccess);
  };

  const handleFailure = () => {
    let resultMessage = "판정 실패!\n";
    let copyMessage = "";
    const selectedParticipants = getRandomParticipants(extractedPeople);

    selectedParticipants.forEach((participant) => {
      if (participant.character) {
        let damage = 0;
        if (attackType === "infection") {
          const infectionRoll = Math.random();
          if (infectionRoll < 0.4) {
            damage = 5 + Math.floor(Math.random() * 3) * 5; // 5, 10, 15 중 하나
            resultMessage += `${participant.character.name}가 긁힘을 당했습니다. [긁힘/체력-${damage}]\n`;
            copyMessage += `${participant.character.name} [긁힘/체력-${damage}]\n`;
            const infectionSuccess = Math.random() < 0.3; // 감염 판정
            if (infectionSuccess) {
              resultMessage += `${participant.character.name}가 감염되었습니다.\n`;
            }
          } else if (infectionRoll < 0.7) {
            damage = 15 + Math.floor(Math.random() * 3) * 5; // 15, 20, 25 중 하나
            resultMessage += `${participant.character.name}가 찢김을 당했습니다. [찢김/체력-${damage}]\n`;
            copyMessage += `${participant.character.name} [찢김/체력-${damage}]\n`;
            const infectionSuccess = Math.random() < 0.6; // 감염 판정
            if (infectionSuccess) {
              resultMessage += `${participant.character.name}가 감염되었습니다.\n`;
            }
          } else if (!excludeBite) {
            damage = 20 + Math.floor(Math.random() * 4) * 5; // 20, 25, 30, 35 중 하나
            resultMessage += `${participant.character.name}가 물림을 당했습니다. [물림/체력-${damage}]\n`;
            copyMessage += `${participant.character.name} [물림/체력-${damage}]\n`;
            resultMessage += `${participant.character.name}가 감염되었습니다.\n`; // 100% 감염
          }
        } else {
          damage = injuryHP;
          participant.character.current_hp -= injuryHP;
          resultMessage += `${participant.character.name}가 ${injuryHP}만큼 부상당했습니다. [부상/체력-${damage}]\n`;
          copyMessage += `${participant.character.name} [부상/체력-${damage}]\n`;
        }
      }
    });

    setCopyResult(copyMessage);
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
          excludeBite={excludeBite}
          setAttackType={setAttackType}
          setJudgeType={setJudgeType}
          setRequiredValue={setRequiredValue}
          setExtractedPeople={setExtractedPeople}
          setInjuryHP={setInjuryHP}
          setExcludeBite={setExcludeBite}
          handleResultCheck={handleResultCheck}
        />
        <div className="trial-information">
          {attackType === "infection" && (
            <div className="exclude-bite">
              <label>
                <input
                  type="checkbox"
                  checked={excludeBite}
                  onChange={(e) => setExcludeBite(e.target.checked)}
                />
                물림 제외
              </label>
            </div>
          )}
          <div className="trial-dashboard">
            <p>
              난이도{" "}
              <span className={getDifficultyClass(difficulty)}>
                {difficulty}
              </span>
            </p>
            <p>
              성공확률 <span>{successRate !== "-" ? successRate : "-"}</span>
            </p>
          </div>
        </div>
      </div>
      <TrialResultMessage
        detailedResult={detailedResult}
        copyResult={copyResult}
        isSuccess={isSuccess}
      />
    </div>
  );
}
