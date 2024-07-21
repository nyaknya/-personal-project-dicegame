import { useState, useEffect, useCallback } from "react";
import { Character } from "../types";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

export function useCharacterSearch(characters: Character[]) {
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
    filteredCharacters,
    activeIndex,
    handleKeyDown,
  };
}
