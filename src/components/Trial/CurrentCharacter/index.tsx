import { useContext, useRef, useState, useEffect } from "react";
import "./style.css";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character } from "../../../types";
import StatsCounter from "../StatsCounter";

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
    setIsWeakness(!isWeakness);
  };

  const handleInfectionChange = () => {
    setIsInfection(!isInfection);
  };

  return (
    <div className="selected-character">
      <div className="select-box">
        <input type="checkbox" />
      </div>
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
        <div className="select-stats">
          <StatsCounter
            key={`${selectedCharacter.name}-aggressive`}
            initial={selectedCharacter.aggressive}
          />
          <StatsCounter
            key={`${selectedCharacter.name}-creativity`}
            initial={selectedCharacter.creativity}
          />
          <StatsCounter
            key={`${selectedCharacter.name}-kindness`}
            initial={selectedCharacter.kindness}
          />
        </div>
      ) : (
        <span className="no-selection">캐릭터를 선택해주세요.</span>
      )}
      {selectedCharacter && (
        <div className="select-condition">
          <div>
            <input
              type="checkbox"
              id="weakness"
              checked={isWeakness}
              onChange={handleWeaknessChange}
            />
            <label htmlFor="weakness">쇠약</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="infection"
              checked={isInfection}
              onChange={handleInfectionChange}
            />
            <label htmlFor="infection">감염</label>
          </div>
        </div>
      )}
      {selectedCharacter && (
        <div className="select-equipment">{selectedCharacter.equipment}</div>
      )}
    </div>
  );
}
