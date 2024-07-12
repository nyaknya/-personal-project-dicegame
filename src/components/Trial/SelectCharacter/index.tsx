import "./style.css";
import CurrentCharacter from "../CurrentCharacter";
import usePeopleCounterStore from "../../../stores/usePeopleCounterStore";
import { useEffect, useContext, useState, useCallback } from "react";
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
  const [sortKey, setSortKey] = useState<
    "aggressive" | "creativity" | "kindness"
  >("aggressive");

  // 상태 초기화 로직을 useCallback으로 분리하여 의존성을 관리
  const initializeStates = useCallback(() => {
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
  }, [characterStates, count, initializeCharacterStates]);

  useEffect(() => {
    initializeStates();
  }, [initializeStates]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    toggleAllSelections(!selectAll);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value as "aggressive" | "creativity" | "kindness");
    const sortedCharacters = [...characterStates].sort((a, b) => {
      if (!a.character || !b.character) return 0;
      return (
        b.character[
          event.target.value as "aggressive" | "creativity" | "kindness"
        ] -
        a.character[
          event.target.value as "aggressive" | "creativity" | "kindness"
        ]
      );
    });
    initializeCharacterStates(sortedCharacters);
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
        <span className="sort-select">
          <select onChange={handleSortChange} value={sortKey}>
            <option value="aggressive">호전성</option>
            <option value="creativity">창의성</option>
            <option value="kindness">이타성</option>
          </select>
        </span>
      </div>
      <div className="select-content">
        {characterStates.map((_, index) => (
          <CurrentCharacter key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
