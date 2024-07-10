import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { CharactersContext } from "../../context/CharactersContext";
import { Character } from "../../types";

export default function CharacterEdit() {
  const { characters, setCharacters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [equipment, setEquipment] = useState<string>("");
  const [status, setStatus] = useState<
    "normal" | "weakness" | "infection" | null
  >(null);

  useEffect(() => {
    if (selectedCharacter) {
      setEquipment(selectedCharacter.equipment || "");
      setStatus(selectedCharacter.status || null);
    }
  }, [selectedCharacter]);

  const handleCharacterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const character =
      characters.find((c) => c.id === parseInt(event.target.value)) || null;
    setSelectedCharacter(character);
  };

  const handleEquipmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEquipment(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as "normal" | "weakness" | "infection");
  };

  const handleSave = async () => {
    if (selectedCharacter) {
      const updatedCharacter = {
        ...selectedCharacter,
        equipment,
        status: status === "normal" ? null : status,
      };

      try {
        const response = await axios.put(
          `/characters/${selectedCharacter.id}`,
          updatedCharacter
        );
        const updatedCharacters = characters.map((character) =>
          character.id === selectedCharacter.id ? response.data : character
        );
        setCharacters(updatedCharacters);
        alert("캐릭터 정보가 성공적으로 저장되었습니다.");
      } catch (error) {
        console.error("Failed to update character:", error);
        alert("캐릭터 정보를 저장하는데 실패했습니다.");
      }
    }
  };

  return (
    <div className="character-edit-container">
      <h2>캐릭터 편집</h2>
      <div className="character-select">
        <label>캐릭터 선택: </label>
        <select onChange={handleCharacterChange}>
          <option value="">선택하세요</option>
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCharacter && (
        <div className="character-details">
          <div className="character-status">
            <label>상태: </label>
            <div className="select-condition">
              <div>
                <input
                  type="radio"
                  id={`${selectedCharacter.id}-normal-edit`}
                  name={`${selectedCharacter.id}-status-edit`}
                  value="normal"
                  checked={status === "normal" || status === null}
                  onChange={handleStatusChange}
                />
                <label htmlFor={`${selectedCharacter.id}-normal-edit`}>
                  정상
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id={`${selectedCharacter.id}-weakness-edit`}
                  name={`${selectedCharacter.id}-status-edit`}
                  value="weakness"
                  checked={status === "weakness"}
                  onChange={handleStatusChange}
                />
                <label htmlFor={`${selectedCharacter.id}-weakness-edit`}>
                  쇠약
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id={`${selectedCharacter.id}-infection-edit`}
                  name={`${selectedCharacter.id}-status-edit`}
                  value="infection"
                  checked={status === "infection"}
                  onChange={handleStatusChange}
                />
                <label htmlFor={`${selectedCharacter.id}-infection-edit`}>
                  감염
                </label>
              </div>
            </div>
          </div>
          <div>
            <label>장착한 장비: </label>
            <input
              type="text"
              value={equipment}
              onChange={handleEquipmentChange}
            />
          </div>
          <button onClick={handleSave}>저장</button>
        </div>
      )}
    </div>
  );
}
