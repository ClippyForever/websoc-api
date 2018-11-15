const express = require("express");
const bodyParser = require("body-parser");
const WebSocAPI = require("./websocapi.js");
var cors = require("cors");
const app = express();
var cors = require("cors");
// Serve static files from the React app
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);
// Put all API endpoints under '/api'
app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/api/websoc", (req, res) => {
  console.log(req.query.courseCodes);
  WebSocAPI.callWebSocAPI1(req.query, re => {
    res.json(re);
  });
});

app.get("/api/codes", async (req, res) => {
  WebSocAPI.a(req.query, re => {
    res.json(re);
  });
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.send("Resource does not exist. Check URL.");
});

module.exports = app;
