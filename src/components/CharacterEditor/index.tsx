import React, { useEffect, useState } from "react";
import axios from "axios";

interface Character {
  name: string;
  hp: number;
  mental: number;
  aggressive: number;
  creativity: number;
  kindness: number;
  status: string | null;
}

const CharacterEditor = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/characters")
      .then((response) => {
        setCharacters(response.data);
        setError(null); // 오류 메시지 초기화
      })
      .catch((error) => {
        setError("Error reading file");
        console.error("Error fetching character data:", error);
      });
  }, []);

  const handleCharacterChange = (
    key: keyof Character,
    value: string | number
  ) => {
    if (selectedCharacter) {
      setSelectedCharacter({ ...selectedCharacter, [key]: value });
    }
  };

  const saveData = () => {
    if (!selectedCharacter) {
      return;
    }

    axios
      .patch("/characters", { character: selectedCharacter })
      .then((response) => {
        alert(response.data);
        setError(null); // 오류 메시지 초기화
        // 저장 후 캐릭터 목록을 갱신합니다.
        setCharacters(
          characters.map((char) =>
            char.name === selectedCharacter.name ? selectedCharacter : char
          )
        );
      })
      .catch((error) => {
        setError("Error saving file");
        console.error("Error saving character data:", error);
      });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    try {
      const updatedCharacter = JSON.parse(value);
      setSelectedCharacter(updatedCharacter);
      setJsonError(null); // JSON 오류 메시지 초기화
    } catch (err) {
      setJsonError("Invalid JSON syntax");
      console.error("Invalid JSON", err);
    }
  };

  return (
    <div>
      <h1>Character Editor</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>
          Select Character:
          <select
            onChange={(e) => {
              const char = characters.find(
                (char) => char.name === e.target.value
              );
              setSelectedCharacter(char || null);
              setJsonError(null); // 캐릭터 변경 시 JSON 오류 메시지 초기화
            }}
          >
            <option value="">Select...</option>
            {characters.map((char) => (
              <option key={char.name} value={char.name}>
                {char.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedCharacter && (
        <div>
          <textarea
            rows={20}
            cols={80}
            value={JSON.stringify(selectedCharacter, null, 2)}
            onChange={handleTextareaChange}
          />
          {jsonError && <div style={{ color: "red" }}>{jsonError}</div>}
          <br />
          <button onClick={saveData} disabled={!!jsonError}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterEditor;
