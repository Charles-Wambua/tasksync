const http = require('http');
const WebSocket = require('ws');

let wss;

const initWebSocketServer = (server) => {
    if (wss) {
        console.warn('WebSocket server is already initialized');
        return wss;
    }

    console.log('Creating new WebSocket server...');
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            const messageStr = message.toString();
            console.log('Received message:', messageStr);
            try {
                const parsedMessage = JSON.parse(messageStr);
                console.log('Parsed message:', parsedMessage);
            } catch (e) {
                console.error('Error parsing message:', e);
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    return wss;
};
const broadcast = (message) => {
    if (wss && wss.clients) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    } else {
        console.error('WebSocket server not initialized');
    }
};

const getWebSocketServer = () => {
    if (!wss) {
        console.warn('WebSocket server not initialized');
    }
    return wss;
};

module.exports = { initWebSocketServer, getWebSocketServer, broadcast };
