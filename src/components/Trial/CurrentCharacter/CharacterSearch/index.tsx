import React, { useState, useRef, useContext } from "react";
import { CharactersContext } from "../../../../context/CharactersContext";
import { Character } from "../../../../types";
import useOutSideClick from "../../../../hooks/useOutSideClick";

interface CharacterSearchProps {
  onCharacterClick: (character: Character) => void;
  selectedCharacterNames: string[];
  selectedCharacter: Character | null;
}

const CharacterSearch: React.FC<CharacterSearchProps> = ({
  onCharacterClick,
  selectedCharacterNames,
  selectedCharacter,
}) => {
  const { characters } = useContext(CharactersContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    return characters.filter(
      (character) =>
        !selectedCharacterNames.includes(character.name) &&
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            className="character-search"
          />
          <ul className="character-select">
            {getAvailableCharacters().map((character) => (
              <li
                key={character.name}
                className="character-option"
                onClick={() => onCharacterClick(character)}
              >
                {character.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CharacterSearch;
