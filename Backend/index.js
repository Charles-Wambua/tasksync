const express = require('express');
const http = require('http');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const crudRoutes = require('./routes/crudRoutes');
const { initWebSocketServer } = require('./websocketServer'); 
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
