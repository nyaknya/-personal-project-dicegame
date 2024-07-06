interface SelectConditionProps {
  isWeakness: boolean;
  isInfection: boolean;
  onWeaknessChange: () => void;
  onInfectionChange: () => void;
  onNormalChange: () => void;
}

export default function SelectCondition({
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
          id="normal"
          name="status"
          checked={!isWeakness && !isInfection}
          onChange={onNormalChange}
        />
        <label htmlFor="normal">정상</label>
      </div>
      <div>
        <input
          type="radio"
          id="weakness"
          name="status"
          checked={isWeakness}
          onChange={onWeaknessChange}
        />
        <label htmlFor="weakness">쇠약</label>
      </div>
      <div>
        <input
          type="radio"
          id="infection"
          name="status"
          checked={isInfection}
          onChange={onInfectionChange}
        />
        <label htmlFor="infection">감염</label>
      </div>
    </div>
  );
}
