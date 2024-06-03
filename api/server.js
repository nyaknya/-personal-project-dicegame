const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());

const filePath = path.join(__dirname, "../characters.js");

app.get("/characters", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    const characters = eval(data);
    res.json(characters);
  });
});

app.post("/characters", (req, res) => {
  const newData = req.body.data;
  fs.writeFile(filePath, newData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error writing file");
    }
    res.send("File updated successfully");
  });
});

app.patch("/characters", (req, res) => {
  const updatedCharacter = req.body.character;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    let characters = eval(data);
    const index = characters.findIndex((c) => c.name === updatedCharacter.name);

    if (index === -1) {
      return res.status(404).send("Character not found");
    }

    characters[index] = { ...characters[index], ...updatedCharacter };

    fs.writeFile(
      filePath,
      `const characters = ${JSON.stringify(
        characters,
        null,
        2
      )};\nmodule.exports = characters;`,
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error writing file");
        }
        res.send("Character updated successfully");
      }
    );
  });
});

module.exports = app;
