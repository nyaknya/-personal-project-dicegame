import { useContext, useState } from "react";
import "./style.css";
import { CharactersContext } from "../../../context/CharactersContext";

export default function ParticipationCharacter() {
  const { characters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  console.log(characters);

  const handleCharacterClick = (name: string) => {
    setSelectedCharacter(name);
  };

  return (
    <div className="selected-character">
      <div className="select-box">
        <input type="checkbox" />
      </div>
      <div className="select-list">
        <span>
          {selectedCharacter ? selectedCharacter : "캐릭터를 선택하세요."}
        </span>
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
      </div>
    </div>
  );
}
