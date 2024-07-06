import "./style.css";
import { useContext, useRef, useState, useEffect } from "react";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character } from "../../../types";
import SelectBox from "./SelectBox";
import SelectStats from "./SelectStats";
import SelectCondition from "./SelectCondition";

export default function CurrentCharacter() {
  const { characters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isWeakness, setIsWeakness] = useState<boolean>(false);
  const [isInfection, setIsInfection] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCharacter) {
      setIsWeakness(selectedCharacter.status === "weakness");
      setIsInfection(selectedCharacter.status === "infection");
    }
  }, [selectedCharacter]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
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
    setIsWeakness((prev) => !prev);
  };

  const handleInfectionChange = () => {
    setIsInfection((prev) => !prev);
  };

  return (
    <div className="selected-character">
      <SelectBox />
      <div className="select-list" ref={ref}>
        <div
          className={`now-selected ${selectedCharacter ? "" : "no-selection"}`}
          onClick={toggleOpenClose}
        >
          {selectedCharacter ? selectedCharacter.name : "캐릭터를 선택하세요."}
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
      {selectedCharacter ? (
        <>
          <SelectStats character={selectedCharacter} />
          <SelectCondition
            isWeakness={isWeakness}
            isInfection={isInfection}
            onWeaknessChange={handleWeaknessChange}
            onInfectionChange={handleInfectionChange}
          />
          <div className="select-equipment">{selectedCharacter.equipment}</div>
        </>
      ) : (
        <span className="no-selection">캐릭터를 선택해주세요.</span>
      )}
    </div>
  );
}
