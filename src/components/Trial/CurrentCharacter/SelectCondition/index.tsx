interface SelectConditionProps {
  characterName: string;
  isWeakness: boolean;
  isInfection: boolean;
  onWeaknessChange: () => void;
  onInfectionChange: () => void;
  onNormalChange: () => void;
}

export default function SelectCondition({
  characterName,
  isWeakness,
  isInfection,
  onWeaknessChange,
  onInfectionChange,
  onNormalChange,
}: SelectConditionProps) {
  return (
    <div className="select-condition">
      <div>
        <input
          type="radio"
          id={`${characterName}-normal`}
          name={`${characterName}-status`}
          checked={!isWeakness && !isInfection}
          onChange={onNormalChange}
        />
        <label htmlFor={`${characterName}-normal`}>정상</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${characterName}-weakness`}
          name={`${characterName}-status`}
          checked={isWeakness}
          onChange={onWeaknessChange}
        />
        <label htmlFor={`${characterName}-weakness`}>쇠약</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${characterName}-infection`}
          name={`${characterName}-status`}
          checked={isInfection}
          onChange={onInfectionChange}
        />
        <label htmlFor={`${characterName}-infection`}>감염</label>
      </div>
    </div>
  );
}
