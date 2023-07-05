import * as http from "http";

import { Worker, workerData, parentPort } from "worker_threads";

import calculateProfit from "./calculateProfit.js";
import async from "async";
import open from "open";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import express from "express";
import { createRequire } from "module";
import fs from "fs";
import WebSocket from "ws";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var app = express();

app.use(express.static(__dirname));
app.use(express.static("assets"));
app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance

//start our server
server.listen(4020, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("CONNECTED");
  ws.send(`Hello, you sent -> `);
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  setTimeout(() => {
    ws.send("Hi there, I am a WebSocket server");
  }, 2000);
});
