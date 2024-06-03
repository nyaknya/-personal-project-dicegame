const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 5000;

app.use(bodyParser.json());

const filePath = path.join(__dirname, "../characters.js");

app.get("/characters", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.send(data);
  });
});

app.post("/characters", (req, res) => {
  const newData = req.body.data;
  fs.writeFile(filePath, newData, "utf8", (err) => {
    if (err) {
      return res.status(500).send("Error writing file");
    }
    res.send("File updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
