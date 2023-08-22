const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET;

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const query = 'SELECT * FROM admins WHERE username = $1';
		const result = await pool.query(query, [username]);
		const admin = result.rows[0];

		if (!admin || password != admin.password) {
			res.status(401).json({ error: 'Invalid credentials' });
			return;
		}

		const token = jwt.sign({ username: admin.username }, secretKey, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		console.error('Error during login', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	login,
};
