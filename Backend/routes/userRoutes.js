const express = require('express');
const { registerUser, loginUser } = require('../userServices/userservices')
const router = express.Router();
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await registerUser(username, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const { token } = await loginUser(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
