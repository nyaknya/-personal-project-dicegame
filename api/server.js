const express = require("express");
const characters = require("../characters");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("기본");
});

app.get("/characters", (req, res) => {
  res.json(characters);
});

module.exports = app;
