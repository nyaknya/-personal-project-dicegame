import { useContext, useState } from "react";
import "./style.css";
import { CharactersContext } from "../../../context/CharactersContext";

export default function ParticipationCharacter() {
  const { characters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCharacterClick = (name: string) => {
    setSelectedCharacter(name);
    setIsOpen(false);
  };

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="selected-character">
      <div className="select-box">
        <input type="checkbox" />
      </div>
      <div className="select-list">
        <div
          className={`now-selected ${selectedCharacter ? "" : "no-selection"}`}
          onClick={toggleOpenClose}
        >
          {selectedCharacter ? selectedCharacter : "캐릭터를 선택하세요."}
          {isOpen ? (
            <img src="/images/up.svg" />
          ) : (
            <img src="/images/down.svg" />
          )}
        </div>
        {isOpen && (
          <ul className="character-select">
            {characters.map((character, index) => (
              <li
                key={index}
                className="character-option"
                onClick={() => handleCharacterClick(character.name)}
              >
                {character.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
