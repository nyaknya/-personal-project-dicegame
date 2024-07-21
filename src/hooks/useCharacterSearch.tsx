import { useState, useContext, useEffect } from "react";
import { CharactersContext } from "../context/CharactersContext";
import { Character } from "../types";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

export function useCharacterSearch() {
  const { characters } = useContext(CharactersContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { activeIndex, handleKeyDown } = useKeyboardNavigation(
    filteredCharacters.length,
    (index) => {
      if (index >= 0 && index < filteredCharacters.length) {
        setSelectedCharacter(filteredCharacters[index]);
        setSearchTerm(filteredCharacters[index].name);
      } else {
        setSelectedCharacter(null);
      }
    }
  );

  useEffect(() => {
    if (searchTerm === "") {
      setSelectedCharacter(null);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCharacter,
    setSelectedCharacter,
    filteredCharacters,
    activeIndex,
    handleKeyDown,
  };
}
