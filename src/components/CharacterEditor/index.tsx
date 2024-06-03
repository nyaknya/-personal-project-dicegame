import { useEffect, useState } from "react";

const CharacterEditor = () => {
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/characters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        setData(text);
        setError(null);
      })
      .catch((error) => {
        setError("Error reading file");
        console.error("Error fetching character data:", error);
      });
  }, []);

  const saveData = () => {
    fetch("/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
        setError(null);
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
      <textarea
        rows={20}
        cols={80}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <br />
      <button onClick={saveData}>Save</button>
    </div>
  );
};

export default CharacterEditor;
