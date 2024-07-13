import React, { useState, useContext, useEffect } from "react";
import { useCharacterStore } from "../../stores/useCharacterStore";
import { CharactersContext } from "../../context/CharactersContext";
import "./style.css";

export default function CharacterSelector() {
  const { characters } = useContext(CharactersContext);
  const characterStates = useCharacterStore((state) => state.characterStates);
  const updateCharacterState = useCharacterStore(
    (state) => state.updateCharacterState
  );
  const [searchName, setSearchName] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

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
      setSelectedCharacter(name);
      setSearchName("");
      setActiveIndex(-1);
    } else {
      alert("해당 이름의 캐릭터가 없습니다.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < filteredCharacters.length) {
        handleCharacterSelect(filteredCharacters[activeIndex].name);
      } else {
        handleCharacterSelect(searchName.trim());
      }
    } else if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < filteredCharacters.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchName.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchName]);

  return (
    <div className="character-selector">
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="캐릭터 이름 입력"
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => handleCharacterSelect(searchName.trim())}>
        선택
      </button>
      <span>◀ 캐릭터 원격 선택</span>
      {searchName &&
        searchName !== selectedCharacter &&
        filteredCharacters.length > 0 && (
          <ul className="filtered-character-list">
            {filteredCharacters.map((character, index) => (
              <li
                key={character.name}
                className={index === activeIndex ? "active" : ""}
                onClick={() => {
                  setSelectedCharacter(character.name);
                  setSearchName(character.name);
                  setActiveIndex(-1);
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
