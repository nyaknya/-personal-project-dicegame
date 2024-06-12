const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());

const filePath = path.join(__dirname, "../characters.js");

app.get("/", (req, res) => {
  res.send("기본");
});

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

module.exports = app;
