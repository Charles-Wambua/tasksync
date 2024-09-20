const express = require('express');
const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const WebSocket = require('ws');
const { getWebSocketServer } = require('../websocketServer');
const { broadcast } = require('../websocketServer');

// This Express router module handles user and record management in a PostgreSQL database, providing routes for creating, reading, updating, and deleting records. It utilizes UUIDs for unique record identifiers and broadcasts updates via a WebSocket server to notify all connected clients of changes in real-time. Each route properly manages error handling and response statuses to ensure smooth interaction with the API.


// Function to broadcast a message to all connected WebSocket clients
// const broadcast = (message) => {
//     const wss = getWebSocketServer();
//     if (wss && wss.clients) {
//         wss.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     } else {
//         console.error('WebSocket server not initialized');
//     }
// };

router.post('/users', async (req, res) => {
    const { firstName, lastName, description } = req.body;
    const id = uuidv4();

    try {
        const result = await pool.query(
            'INSERT INTO records (id, first_name, last_name, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, firstName, lastName, description]
        );
        const newRecord = result.rows[0];
        console.log('New record created:', newRecord);

        const message = JSON.stringify({ type: 'NEW_RECORD', payload: newRecord });
        broadcast(message);

        res.status(201).json(newRecord);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});
router.get('/records', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM records');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Error fetching records' });
    }
});
router.get('/records/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM records WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching record' });
    }
});
router.put('/records/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, description } = req.body;

    try {
        const result = await pool.query(
            'UPDATE records SET first_name = $1, last_name = $2, description = $3 WHERE id = $4 RETURNING *',
            [first_name, last_name, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        const updatedRecord = result.rows[0];
        broadcast(JSON.stringify({ type: 'UPDATE_RECORD', payload: updatedRecord }));
        res.status(200).json(updatedRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating record' });
    }
});
router.delete('/records/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM records WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        const deletedRecord = result.rows[0];
        broadcast(JSON.stringify({ type: 'DELETE_RECORD', payload: deletedRecord }));
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting record' });
    }
});

module.exports = router;
