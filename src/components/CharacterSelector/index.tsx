import React, { useContext } from "react";
import { useCharacterStore } from "../../stores/useCharacterStore";
import { useCharacterSearch } from "../../hooks/useCharacterSearch";
import { CharactersContext } from "../../context/CharactersContext";
import "./style.css";

export default function CharacterSelector() {
  const { characters } = useContext(CharactersContext);
  const characterStates = useCharacterStore((state) => state.characterStates);
  const updateCharacterState = useCharacterStore(
    (state) => state.updateCharacterState
  );

  const {
    searchTerm,
    setSearchTerm,
    selectedCharacter,
    setSelectedCharacter,
    filteredCharacters,
    activeIndex,
    handleKeyDown,
  } = useCharacterSearch();

  const handleCharacterSelect = (name: string) => {
    const character = characters.find((c) => c.name === name);
    if (character) {
      const index = characterStates.findIndex(
        (state) => state.character?.name === character.name
      );
      if (index !== -1) {
        const updatedState = {
          ...characterStates[index],
          isSelected: true,
        };
        updateCharacterState(index, updatedState);
        alert(`${character.name}이(가) 선택되었습니다.`);
      } else {
        alert("해당 캐릭터를 찾을 수 없습니다.");
      }
      setSelectedCharacter(character);
      setSearchTerm("");
    } else {
      alert("해당 이름의 캐릭터가 없습니다.");
    }
  };

  return (
    <div className="character-selector">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="캐릭터 이름 입력"
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => handleCharacterSelect(searchTerm.trim())}>
        선택
      </button>
      <span>◀ 캐릭터 원격 선택</span>
      {searchTerm &&
        searchTerm !== selectedCharacter?.name &&
        filteredCharacters.length > 0 && (
          <ul className="filtered-character-list">
            {filteredCharacters.map((character, index) => (
              <li
                key={character.name}
                className={index === activeIndex ? "active" : ""}
                onClick={() => {
                  setSelectedCharacter(character);
                  setSearchTerm(character.name);
                }}
              >
                {character.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
