import { useState, useRef } from "react";
import useOutSideClick from "../../../../hooks/useOutSideClick";
import { Character } from "../../../../types";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    searchTerm,
    setSearchTerm,
    filteredCharacters,
    activeIndex,
    handleKeyDown,
  } = useCharacterSearch();

  const ref = useRef<HTMLDivElement>(null);

  useOutSideClick({
    ref,
    callback: () => setIsOpen(false),
  });

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const getAvailableCharacters = () => {
    return filteredCharacters.filter(
      (character) => !selectedCharacterNames.includes(character.name)
    );
  };

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
          <ul className="character-select">
            {getAvailableCharacters().map((character, index) => (
              <li
                key={character.name}
                className={index === activeIndex ? "active" : ""}
                onClick={() => {
                  onCharacterClick(character);
                  setIsOpen(false);
                }}
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
