interface SelectConditionProps {
  isWeakness: boolean;
  isInfection: boolean;
  onWeaknessChange: () => void;
  onInfectionChange: () => void;
}

export default function SelectCondition({
  isWeakness,
  isInfection,
  onWeaknessChange,
  onInfectionChange,
}: SelectConditionProps) {
  return (
    <div className="select-condition">
      <div>
        <input
          type="checkbox"
          id="weakness"
          checked={isWeakness}
          onChange={onWeaknessChange}
        />
        <label htmlFor="weakness">쇠약</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="infection"
          checked={isInfection}
          onChange={onInfectionChange}
        />
        <label htmlFor="infection">감염</label>
      </div>
    </div>
  );
}
