import React, { useEffect, useState } from "react";

interface Character {
  name: string;
  hp: number;
  mental: number;
  aggressive: number;
  creativity: number;
  kindness: number;
  status: string | null;
}

const CharacterEditor: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/characters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data);
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

    fetch("/characters", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character: selectedCharacter }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
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
            onChange={(e) => {
              try {
                const updatedCharacter = JSON.parse(e.target.value);
                setSelectedCharacter(updatedCharacter);
              } catch (err) {
                console.error("Invalid JSON", err);
              }
            }}
          />
          <br />
          <button onClick={saveData}>Save</button>
        </div>
      )}
    </div>
  );
};

export default CharacterEditor;
