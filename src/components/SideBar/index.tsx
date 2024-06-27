import { useContext, useState } from "react";
import "./style.css";
import CharacterList from "./CharacterList";
import ToggleButton from "../ToggleButton";
import { CharactersContext } from "../../context/CharactersContext";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const { characters } = useContext(CharactersContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-wrap ${isOpen ? "open" : "closed"}`}>
      <div className="character-list-header">
        <h2>캐릭터 리스트</h2>
        <ToggleButton isOpen={isOpen} onToggle={handleToggle} />
      </div>
      <CharacterList characters={characters} isOpen={isOpen} />
    </div>
  );
}
