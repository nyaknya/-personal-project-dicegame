import "./style.css";
import { useContext, useRef, useEffect, useState } from "react";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character } from "../../../types";
import SelectBox from "./SelectBox";
import SelectStats from "./SelectStats";
import SelectCondition from "./SelectCondition";

interface Stats {
  aggressive: number;
  creativity: number;
  kindness: number;
}

interface CharacterState {
  character: Character | null;
  isWeakness: boolean;
  isInfection: boolean;
  stats: Stats;
}

interface CurrentCharacterProps {
  index: number;
  characterState: CharacterState;
  onCharacterChange: (index: number, updatedState: CharacterState) => void;
}

const CurrentCharacter: React.FC<CurrentCharacterProps> = ({
  index,
  characterState,
  onCharacterChange,
}) => {
  const { characters } = useContext(CharactersContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterState.character) {
      onCharacterChange(index, {
        ...characterState,
        isWeakness: characterState.character.status === "weakness",
        isInfection: characterState.character.status === "infection",
        stats: {
          aggressive: characterState.character.aggressive,
          creativity: characterState.character.creativity,
          kindness: characterState.character.kindness,
        },
      });
    }
  }, [characterState.character]);

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
    onCharacterChange(index, updatedState);
    setIsOpen(false);
  };

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  useOutSideClick({
    ref,
    callback: () => setIsOpen(false),
  });

  const handleWeaknessChange = () => {
    const updatedState = { ...characterState };
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
          updatedState.stats.kindness > 1 ? updatedState.stats.kindness - 1 : 1,
      };
    } else {
      updatedState.stats = {
        aggressive: updatedState.character?.aggressive || 0,
        creativity: updatedState.character?.creativity || 0,
        kindness: updatedState.character?.kindness || 0,
      };
    }
    updatedState.isWeakness = !updatedState.isWeakness;
    if (updatedState.isInfection) updatedState.isInfection = false;
    onCharacterChange(index, updatedState);
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
    onCharacterChange(index, updatedState);
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
    onCharacterChange(index, updatedState);
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
            {characters.map((character) => (
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
      {characterState.character ? (
        <>
          <SelectStats
            character={characterState.character}
            stats={characterState.stats}
          />
          <SelectCondition
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
      ) : (
        <span className="no-selection">캐릭터를 선택해주세요.</span>
      )}
    </div>
  );
};

export default CurrentCharacter;
