var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

// Variables for url and api key
const meaningcloudAPI = {
  url: `${API_URL}`,
  key: `${process.env.API_KEY}`,
};

const API_URL = `https://api.meaningcloud.com/sentiment-2.1?`;

app.get("/", function (req, res) {
  // res.send("This is the server API page, you may access its services via the client app.");
  res.sendFile("dist/index.html");
});

// POST Route
app.post('/api', (req, res) => {
  req.body
});

// Designates what port the app will listen to for incoming requests
const PORT = 9000;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
