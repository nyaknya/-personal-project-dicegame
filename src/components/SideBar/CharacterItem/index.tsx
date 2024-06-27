import "./style.css";
import { Character } from "../../../types";
import transformStatusText from "../../../utils/transformStatusText";

interface CharacterItemProps {
  character: Character;
}

export default function CharacterItem({ character }: CharacterItemProps) {
  const { name, hp, mental, aggressive, creativity, kindness, status } =
    character;

  return (
    <div className="character-item">
      <span>{name}</span>
      <span>{hp}</span>
      <span>{mental}</span>
      <span>{aggressive}</span>
      <span>{creativity}</span>
      <span>{kindness}</span>
      <span className={`default ${status}`}>{transformStatusText(status)}</span>
    </div>
  );
}
