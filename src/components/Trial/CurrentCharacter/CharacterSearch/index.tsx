import React, { useState, useRef, useContext, useEffect } from "react";
import { CharactersContext } from "../../../../context/CharactersContext";
import { Character } from "../../../../types";
import useOutSideClick from "../../../../hooks/useOutSideClick";
import { useCharacterSearch } from "../../../../hooks/useCharacterSearch";

interface CharacterSearchProps {
  onCharacterClick: (character: Character) => void;
  selectedCharacterNames: string[];
  selectedCharacter: Character | null;
}

export default function CharacterSearch({
  onCharacterClick,
  selectedCharacterNames,
  selectedCharacter,
}: CharacterSearchProps) {
  const { characters } = useContext(CharactersContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    searchTerm,
    setSearchTerm,
    filteredCharacters,
    activeIndex,
    handleKeyDown,
  } = useCharacterSearch(characters);

  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useOutSideClick({
    ref,
    callback: () => setIsOpen(false),
  });

  useEffect(() => {
    if (listRef.current && activeIndex !== -1) {
      const activeElement = listRef.current.children[
        activeIndex
      ] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const getAvailableCharacters = () => {
    return filteredCharacters.filter(
      (character) => !selectedCharacterNames.includes(character.name)
    );
  };

  const handleCharacterSelect = (character: Character) => {
    onCharacterClick(character);
    setSearchTerm(character.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isOpen) {
        if (
          event.key === "Enter" &&
          activeIndex >= 0 &&
          activeIndex < filteredCharacters.length
        ) {
          handleCharacterSelect(filteredCharacters[activeIndex]);
        } else {
          handleKeyDown(
            event as unknown as React.KeyboardEvent<HTMLInputElement>
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleKeyDown, activeIndex, filteredCharacters]);

  return (
    <div className="select-list" ref={ref}>
      <div className="now-selected" onClick={toggleOpenClose}>
        {selectedCharacter ? selectedCharacter.name : "　"}
        {isOpen ? (
          <img src="/images/up.svg" alt="위 화살표" />
        ) : (
          <img src="/images/down.svg" alt="아래 화살표" />
        )}
      </div>
      {isOpen && (
        <>
          <input
            type="text"
            placeholder="캐릭터 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="character-search"
          />
          <ul className="character-select" ref={listRef}>
            {getAvailableCharacters().map((character, index) => (
              <li
                key={character.name}
                className={`character-option ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleCharacterSelect(character)}
              >
                {character.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
