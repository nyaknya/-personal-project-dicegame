import React, { useEffect, useState } from "react";

const CharacterEditor = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/characters")
      .then((response) => response.text())
      .then((text) => setData(text));
  }, []);

  const saveData = () => {
    fetch("/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => response.text())
      .then((message) => alert(message));
  };

  return (
    <div>
      <h1>Character Editor</h1>
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
