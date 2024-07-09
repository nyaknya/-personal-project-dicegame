import "./style.css";
import { useContext, useRef, useState } from "react";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character, CharacterState } from "../../../types";
import SelectBox from "./SelectBox";
import SelectStats from "./SelectStats";
import SelectCondition from "./SelectCondition";
import { useCharacterStore } from "../../../stores/useCharacterStore";

interface CurrentCharacterProps {
  index: number;
}

const CurrentCharacter: React.FC<CurrentCharacterProps> = ({ index }) => {
  const { characters } = useContext(CharactersContext);
  const characterState = useCharacterStore(
    (state) => state.characterStates[index]
  );
  const updateCharacterState = useCharacterStore(
    (state) => state.updateCharacterState
  );
  const toggleCharacterSelection = useCharacterStore(
    (state) => state.toggleCharacterSelection
  );
  const characterStates = useCharacterStore((state) => state.characterStates);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutSideClick({
    ref,
    callback: () => setIsOpen(false),
  });

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const handleCharacterClick = (character: Character) => {
    const updatedState: CharacterState = {
      character,
      isWeakness: character.status === "weakness",
      isInfection: character.status === "infection",
      originalStats: {
        aggressive: character.aggressive,
        creativity: character.creativity,
        kindness: character.kindness,
      },
      stats: {
        aggressive: character.aggressive,
        creativity: character.creativity,
        kindness: character.kindness,
      },
      isSelected: characterState.isSelected, // 초기값 유지
    };
    if (character.status === "weakness") {
      updatedState.stats = {
        aggressive: character.aggressive > 1 ? character.aggressive - 1 : 1,
        creativity: character.creativity > 1 ? character.creativity - 1 : 1,
        kindness: character.kindness > 0 ? character.kindness - 1 : 0,
      };
    } else if (character.status === "infection") {
      updatedState.stats = {
        aggressive: 1,
        creativity: 1,
        kindness: 0,
      };
    }
    updateCharacterState(index, updatedState);
    setIsOpen(false);
  };

  const handleWeaknessChange = () => {
    const updatedState = { ...characterState };
    if (!updatedState.isWeakness) {
      updatedState.stats = {
        aggressive:
          updatedState.originalStats.aggressive > 1
            ? updatedState.originalStats.aggressive - 1
            : 1,
        creativity:
          updatedState.originalStats.creativity > 1
            ? updatedState.originalStats.creativity - 1
            : 1,
        kindness:
          updatedState.originalStats.kindness > 0
            ? updatedState.originalStats.kindness - 1
            : 0,
      };
    } else {
      updatedState.stats = { ...updatedState.originalStats };
    }
    updatedState.isWeakness = !updatedState.isWeakness;
    if (updatedState.isInfection) updatedState.isInfection = false;
    updateCharacterState(index, updatedState);
  };

  const handleInfectionChange = () => {
    const updatedState = { ...characterState };
    if (!updatedState.isInfection) {
      updatedState.stats = {
        aggressive: 1,
        creativity: 1,
        kindness: 0,
      };
    } else {
      updatedState.stats = { ...updatedState.originalStats };
    }
    updatedState.isInfection = !updatedState.isInfection;
    if (updatedState.isWeakness) updatedState.isWeakness = false;
    updateCharacterState(index, updatedState);
  };

  const handleNormalChange = () => {
    const updatedState = { ...characterState };
    updatedState.isWeakness = false;
    updatedState.isInfection = false;
    updatedState.stats = { ...updatedState.originalStats };
    updateCharacterState(index, updatedState);
  };

  const getAvailableCharacters = () => {
    const selectedCharacters = characterStates
      .filter((state) => state.character)
      .map((state) => state.character?.name);
    return characters.filter(
      (character) => !selectedCharacters.includes(character.name)
    );
  };

  const handleCheckboxChange = () => {
    toggleCharacterSelection(index);
  };

  return (
    <div className="selected-character">
      <SelectBox
        checked={characterState.isSelected}
        onChange={handleCheckboxChange}
      />
      <div className="select-list" ref={ref}>
        <div
          className={`now-selected ${
            characterState.character ? "" : "no-selection"
          }`}
          onClick={toggleOpenClose}
        >
          {characterState.character
            ? characterState.character.name
            : "캐릭터를 선택하세요."}
          {isOpen ? (
            <img src="/images/up.svg" alt="위 화살표" />
          ) : (
            <img src="/images/down.svg" alt="아래 화살표" />
          )}
        </div>
        {isOpen && (
          <ul className="character-select">
            {getAvailableCharacters().map((character) => (
              <li
                key={character.name}
                className="character-option"
                onClick={() => handleCharacterClick(character)}
              >
                {character.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {characterState.character && (
        <>
          <SelectStats
            character={characterState.character}
            stats={characterState.stats}
          />
          <SelectCondition
            characterName={characterState.character.name}
            isWeakness={characterState.isWeakness}
            isInfection={characterState.isInfection}
            onWeaknessChange={handleWeaknessChange}
            onInfectionChange={handleInfectionChange}
            onNormalChange={handleNormalChange}
          />
          <div className="select-equipment">
            {characterState.character.equipment}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentCharacter;
