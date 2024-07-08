import "./style.css";
import { useContext, useEffect, useRef, useState } from "react";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character } from "../../../types";
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
    const updatedState = {
      character,
      isWeakness: character.status === "weakness",
      isInfection: character.status === "infection",
      stats: {
        aggressive: character.aggressive,
        creativity: character.creativity,
        kindness: character.kindness,
      },
    };
    updateCharacterState(index, updatedState);
    setIsOpen(false);
  };

  const handleWeaknessChange = () => {
    const updatedState = { ...characterState };
    updatedState.stats = {
      aggressive: characterState.character?.aggressive ?? 0,
      creativity: characterState.character?.creativity ?? 0,
      kindness: characterState.character?.kindness ?? 0,
    };

    if (!updatedState.isWeakness) {
      updatedState.stats = {
        aggressive:
          updatedState.stats.aggressive > 1
            ? updatedState.stats.aggressive - 1
            : 1,
        creativity:
          updatedState.stats.creativity > 1
            ? updatedState.stats.creativity - 1
            : 1,
        kindness:
          updatedState.stats.kindness > 0 ? updatedState.stats.kindness - 1 : 0,
      };
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
      updatedState.stats = {
        aggressive: updatedState.character?.aggressive || 0,
        creativity: updatedState.character?.creativity || 0,
        kindness: updatedState.character?.kindness || 0,
      };
    }
    updatedState.isInfection = !updatedState.isInfection;
    if (updatedState.isWeakness) updatedState.isWeakness = false;
    updateCharacterState(index, updatedState);
  };

  const handleNormalChange = () => {
    const updatedState = { ...characterState };
    updatedState.isWeakness = false;
    updatedState.isInfection = false;
    if (updatedState.character) {
      updatedState.stats = {
        aggressive: updatedState.character.aggressive,
        creativity: updatedState.character.creativity,
        kindness: updatedState.character.kindness,
      };
    }
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

  return (
    <div className="selected-character">
      <SelectBox />
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
