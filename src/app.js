const express = require("express");
const message = require("./message.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.post("/message", message);

module.exports = app;
