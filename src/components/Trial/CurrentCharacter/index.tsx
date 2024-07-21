import "./style.css";
import { useState, useEffect } from "react";
import { useCharacterStore } from "../../../stores/useCharacterStore";
import { Character, CharacterState } from "../../../types";
import SelectBox from "./SelectBox";
import SelectStats from "./SelectStats";
import SelectCondition from "./SelectCondition";
import CharacterSearch from "./CharacterSearch";

interface CurrentCharacterProps {
  index: number;
}

export default function CurrentCharacter({ index }: CurrentCharacterProps) {
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
      isSelected: characterState.isSelected,
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

  useEffect(() => {
    if (characterState.character) {
      const updatedState = { ...characterState };
      if (updatedState.isWeakness) {
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
      } else if (updatedState.isInfection) {
        updatedState.stats = {
          aggressive: 1,
          creativity: 1,
          kindness: 0,
        };
      } else {
        updatedState.stats = { ...updatedState.originalStats };
      }
      updateCharacterState(index, updatedState);
    }
  }, [
    characterState.isWeakness,
    characterState.isInfection,
    characterState.character,
    index,
    updateCharacterState,
  ]);

  const handleWeaknessChange = () => {
    const updatedState = { ...characterState };
    updatedState.isWeakness = !updatedState.isWeakness;
    if (updatedState.isInfection) updatedState.isInfection = false;
    updateCharacterState(index, updatedState);
  };

  const handleInfectionChange = () => {
    const updatedState = { ...characterState };
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

  const handleCheckboxChange = () => {
    toggleCharacterSelection(index);
  };

  const handleStatsChange = (newStats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  }) => {
    const updatedState = { ...characterState, stats: newStats };
    updateCharacterState(index, updatedState);
  };

  const selectedCharacterNames = characterStates
    .filter((state) => state.character)
    .map((state) => state.character?.name) as string[];

  return (
    <div
      className={`selected-character ${
        characterState.isSelected ? "checked" : ""
      }`}
    >
      <SelectBox
        checked={characterState.isSelected}
        onChange={handleCheckboxChange}
      />
      <CharacterSearch
        onCharacterClick={handleCharacterClick}
        selectedCharacterNames={selectedCharacterNames}
        selectedCharacter={characterState.character}
      />
      {characterState.character && (
        <>
          <SelectStats
            character={characterState.character}
            stats={characterState.stats}
            onStatsChange={handleStatsChange}
          />
          <SelectCondition
            characterName={characterState.character.name}
            isWeakness={characterState.isWeakness}
            isInfection={characterState.isInfection}
            onWeaknessChange={handleWeaknessChange}
            onInfectionChange={handleInfectionChange}
            onNormalChange={handleNormalChange}
          />
        </>
      )}
    </div>
  );
}
