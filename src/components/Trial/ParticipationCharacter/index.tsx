import { useContext } from "react";
import "./style.css";
import { CharactersContext } from "../../../context/CharactersContext";

export default function ParticipationCharacter() {
  const { characters } = useContext(CharactersContext);

  console.log(characters);

  const selectedNow = "예상도 : 캐릭터 이름 ? 선택한 캐릭터 : 초기값";

  return (
    <div className="selected-character">
      <div className="select-box">
        <input type="checkbox" />
      </div>
      <div className="select-list">
        <span>{selectedNow}</span>
        <ul className="character-select">
          {characters.map((character, index) => (
            <li key={index} className="character-option">
              {character.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
