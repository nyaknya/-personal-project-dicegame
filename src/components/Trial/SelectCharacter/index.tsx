import "./style.css";
import CurrentCharacter from "../CurrentCharacter";
import usePeopleCounterStore from "../../../stores/usePeopleCounterStore";
import { useState, useEffect } from "react";
import { Character } from "../../../types";

interface CharacterState {
  character: Character | null;
  isWeakness: boolean;
  isInfection: boolean;
  stats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  };
}

export default function SelectCharacter() {
  const count = usePeopleCounterStore((state) => state.count);
  const initialCharacterState: CharacterState = {
    character: null,
    isWeakness: false,
    isInfection: false,
    stats: {
      aggressive: 0,
      creativity: 0,
      kindness: 0,
    },
  };

  const [characterStates, setCharacterStates] = useState<CharacterState[]>(
    Array.from({ length: count }, () => ({ ...initialCharacterState }))
  );

  useEffect(() => {
    setCharacterStates(
      Array.from({ length: count }, () => ({ ...initialCharacterState }))
    );
  }, [count]);

  const handleCharacterChange = (
    index: number,
    updatedState: CharacterState
  ) => {
    setCharacterStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = updatedState;
      return newState;
    });
  };

  return (
    <div className="trial-select">
      <div className="select-category">
        <input type="checkbox" />
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
        {characterStates.map((state, index) => (
          <CurrentCharacter
            key={index}
            index={index}
            characterState={state}
            onCharacterChange={handleCharacterChange}
          />
        ))}
      </div>
    </div>
  );
}
