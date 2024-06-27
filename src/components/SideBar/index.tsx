import { useContext } from "react";
import "./style.css";
import CharacterList from "./CharacterList";
import ToggleButton from "../ToggleButton";
import { CharactersContext } from "../../context/CharactersContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const SIDEBAR_STORAGE_KEY = "sidebarIsOpen";

export default function SideBar() {
  const { characters } = useContext(CharactersContext);
  const [isOpen, setIsOpen] = useLocalStorage(SIDEBAR_STORAGE_KEY, true);

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
