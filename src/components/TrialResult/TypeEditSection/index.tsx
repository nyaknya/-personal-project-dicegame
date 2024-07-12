import React from "react";
import JudgeTypeSelector from "../JudgeTypeSelector";

interface TypeEditSectionProps {
  attackType: "injury" | "infection";
  judgeType: string;
  requiredValue: number;
  extractedPeople: number;
  injuryHP: number;
  excludeBite: boolean; // 물림 제외 옵션 추가
  setAttackType: (type: "injury" | "infection") => void;
  setJudgeType: (type: string) => void;
  setRequiredValue: (value: number) => void;
  setExtractedPeople: (value: number) => void;
  setInjuryHP: (value: number) => void;
  setExcludeBite: (value: boolean) => void; // 물림 제외 옵션 추가
  handleResultCheck: () => void;
}

export default function TypeEditSection({
  attackType,
  judgeType,
  requiredValue,
  extractedPeople,
  injuryHP,
  excludeBite,
  setAttackType,
  setJudgeType,
  setRequiredValue,
  setExtractedPeople,
  setInjuryHP,
  setExcludeBite, // 물림 제외 옵션 추가
  handleResultCheck,
}: TypeEditSectionProps) {
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

  const handleExcludeBiteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExcludeBite(event.target.checked);
  };

  return (
    <div className="edit-field ">
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
              disabled={attackType === "infection"}
            />
          </div>
        </div>
        <button className="result-button" onClick={handleResultCheck}>
          결과 측정
        </button>
      </div>
    </div>
  );
}
