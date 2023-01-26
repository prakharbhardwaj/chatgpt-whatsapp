const express = require("express");
const chatgpt = require("../src/chatgpt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello there"));

app.post("/chatgpt", chatgpt);

module.exports = app;
