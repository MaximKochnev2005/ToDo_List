const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET;

const authenticateAdmin = (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const decodedToken = jwt.verify(token, secretKey);
		req.adminUsername = decodedToken.username;
		next();
	} catch (error) {
		console.log(token)
		console.error('Error verifying token', error);
		res.status(401).json({ error: 'Unauthorized' });
	}
};

module.exports = {
	authenticateAdmin,
};