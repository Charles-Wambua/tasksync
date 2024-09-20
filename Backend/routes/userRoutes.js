const express = require('express');
const { registerUser, loginUser } = require('../userServices/userservices')
const router = express.Router();
// This Express router module manages user registration and login functionalities. It imports user service functions for handling the business logic. The `/register` route creates a new user and responds with the user's details, while the `/login` route authenticates the user and returns a JWT token upon successful login. Error handling is implemented to respond with appropriate status codes and messages for both successful and failed operations.

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
