import { useContext, useState, useEffect } from "react";
import "./style.css";
import CharacterList from "./CharacterList";
import ToggleButton from "../ToggleButton";
import { CharactersContext } from "../../context/CharactersContext";

export default function SideBar() {
  const { characters } = useContext(CharactersContext);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedIsOpen = localStorage.getItem("sidebarIsOpen");
    if (savedIsOpen !== null) {
      setIsOpen(JSON.parse(savedIsOpen));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarIsOpen", JSON.stringify(isOpen));
  }, [isOpen]);

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
