import "./style.css";
import CurrentCharacter from "../CurrentCharacter";
import usePeopleCounterStore from "../../../stores/usePeopleCounterStore";
import { useEffect, useContext, useState } from "react";
import { useCharacterStore } from "../../../stores/useCharacterStore";
import { CharactersContext } from "../../../context/CharactersContext";
import { CharacterState } from "../../../types";

export default function SelectCharacter() {
  const count = usePeopleCounterStore((state) => state.count);
  const initializeCharacterStates = useCharacterStore(
    (state) => state.initializeCharacterStates
  );
  const characterStates = useCharacterStore((state) => state.characterStates);
  const toggleAllSelections = useCharacterStore(
    (state) => state.toggleAllSelections
  );
  const { characters } = useContext(CharactersContext);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (characterStates.length < count) {
      const additionalCharacters: CharacterState[] = Array.from(
        { length: count - characterStates.length },
        () => ({
          character: null,
          isWeakness: false,
          isInfection: false,
          stats: {
            aggressive: 0,
            creativity: 0,
            kindness: 0,
          },
          originalStats: {
            aggressive: 0,
            creativity: 0,
            kindness: 0,
          },
          isSelected: false,
        })
      );
      initializeCharacterStates([...characterStates, ...additionalCharacters]);
    }
  }, [characters, count, initializeCharacterStates, characterStates]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    toggleAllSelections(!selectAll);
  };

  return (
    <div className="trial-select">
      <div className="select-category">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
        <span className="name">캐릭터 이름</span>
        <div className="stats">
          <span>호전성</span>
          <span>창의성</span>
          <span>이타성</span>
        </div>
        <span className="debuff">상태</span>
        <span className="equipment">장착한 장비</span>
      </div>
      <div className="select-content">
        {characterStates.map((_, index) => (
          <CurrentCharacter key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
