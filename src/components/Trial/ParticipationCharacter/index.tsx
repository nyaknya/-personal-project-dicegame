import { useContext, useRef, useState } from "react";
import "./style.css";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character } from "../../../types";
import StatsCounter from "../StatsCounter";

export default function ParticipationCharacter() {
  const { characters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

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
          <StatsCounter initial={selectedCharacter.aggressive} />
          <StatsCounter initial={selectedCharacter.creativity} />
          <StatsCounter initial={selectedCharacter.kindness} />
        </div>
      ) : (
        <span className="no-selection">캐릭터를 선택해주세요.</span>
      )}
    </div>
  );
}
