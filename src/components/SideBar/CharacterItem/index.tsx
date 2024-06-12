import "./style.css";
import { Status, Character } from "../../../types";

interface CharacterItemProps {
  character: Character;
}

export default function CharacterItem({ character }: CharacterItemProps) {
  const { name, hp, mental, aggressive, creativity, kindness, status } =
    character;

  const getStatusText = (status: Status | null): string => {
    switch (status) {
      case "weakness":
        return "쇠약";
      case "infection":
        return "감염";
      case null:
      default:
        return "정상";
    }
  };

  return (
    <div className="character-item">
      <span>{name}</span>
      <span>{hp}</span>
      <span>{mental}</span>
      <span>{aggressive}</span>
      <span>{creativity}</span>
      <span>{kindness}</span>
      <span className={`default ${status}`}>{getStatusText(status)}</span>
    </div>
  );
}
