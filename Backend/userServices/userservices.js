const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Registration failed');
    }
}
const loginUser = async (username, password) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('User not found');
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return { token };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Login failed');
    }
};

module.exports = { registerUser, loginUser };
