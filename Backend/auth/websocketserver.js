const WebSocket = require('ws');
const http = require('http');
const express = require('express');
// This Node.js server sets up an Express application with an integrated WebSocket server, handling client connections and messages, broadcasting updates to all connected clients, and logging connection events, while listening on port 4001 for incoming WebSocket connections.
 
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const sendUpdate = (update) => {
  broadcast(update);
};

server.listen(4001, () => {
  console.log('WebSocket server is running on ws://localhost:4001');
});
