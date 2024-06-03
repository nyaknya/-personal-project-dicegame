const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());

const filePath = path.join(__dirname, "../characters.js");

// 파일 읽기
app.get("/characters", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
    res.send(data);
  });
});

// 파일 쓰기
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

module.exports = app;
