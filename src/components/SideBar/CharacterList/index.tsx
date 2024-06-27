import { Character } from "../../../types";
import CharacterItem from "../CharacterItem";
import "./style.css";

interface CharacterListProps {
  characters: Character[];
  isOpen: boolean;
}

export default function CharacterList({
  characters,
  isOpen,
}: CharacterListProps) {
  return (
    <div
      className={`character-list-container ${isOpen ? "visible" : "hidden"}`}
    >
      <div className="category">
        <span>이름</span>
        <span>체력</span>
        <span>정신력</span>
        <span>호</span>
        <span>창</span>
        <span>이</span>
        <span>상태</span>
      </div>
      <div className="character-list">
        {characters.map((character) => (
          <CharacterItem key={character.name} character={character} />
        ))}
      </div>
    </div>
  );
}
