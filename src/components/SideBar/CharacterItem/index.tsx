import "./style.css";
import { Character } from "../../../types";
import transformStatusText from "../../../utils/transformStatusText";

interface CharacterItemProps {
  character: Character;
}

export default function CharacterItem({ character }: CharacterItemProps) {
  const {
    name,
    current_hp,
    current_mental,
    aggressive,
    creativity,
    kindness,
    status,
  } = character;

  return (
    <div className="character-item">
      <span>{name}</span>
      <span>{current_hp}</span>
      <span>{current_mental}</span>
      <span>{aggressive}</span>
      <span>{creativity}</span>
      <span>{kindness}</span>
      <span className={`default ${status}`}>{transformStatusText(status)}</span>
    </div>
  );
}
