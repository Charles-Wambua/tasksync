const express = require('express');
const http = require('http');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const crudRoutes = require('./routes/crudRoutes');
const { initWebSocketServer } = require('./websocketServer'); 
// This code sets up an Express server with CORS support and JSON body parsing. It initializes WebSocket functionality and registers routes for user management and CRUD operations. The server listens on a specified port, and upon successful startup, it logs a message indicating the server is running and connected to PostgreSQL.

require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const wss = initWebSocketServer(server); 
initWebSocketServer(server);
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/api', crudRoutes);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Connected to PostgreSQL, Successfully');
});
