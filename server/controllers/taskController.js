const pool = require('../db/db');
const itemsPerPage = 3;

const getTasks = async (req, res) => {
	const { page = 1, sortBy = 'user_name', sortOrder = 'asc' } = req.query;
	const offset = (page - 1) * itemsPerPage;

	try {
		const query = `
      SELECT id, user_name, email, text, status, isChanged
      FROM tasks
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ${itemsPerPage}
      OFFSET ${offset}
    `;
		const result = await pool.query(query);
		const tasks = result.rows;

		res.json(tasks);
	} catch (error) {
		console.error('Error fetching tasks', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const createTask = async (req, res) => {
	const { user_name, email, text } = req.body;

	try {
		const query = 'INSERT INTO tasks (user_name, email, text) VALUES ($1, $2, $3)';
		await pool.query(query, [user_name, email, text]);

		res.status(201).json({ message: 'Task created successfully' });
	} catch (error) {
		console.error('Error creating task', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const updateTask = async (req, res) => {
	const { id } = req.params;
	const { text, status } = req.body;

	try {
		const currentTaskQuery = 'SELECT text FROM tasks WHERE id = $1';
		const currentTaskResult = await pool.query(currentTaskQuery, [id]);
		const currentText = currentTaskResult.rows[0].text;

		const updateQuery = 'UPDATE tasks SET text = $1, status = $2 WHERE id = $3';
		await pool.query(updateQuery, [text, status, id]);

		if (currentText !== text) {
			const updateIsChangedQuery = 'UPDATE tasks SET isChanged = true WHERE id = $1';
			await pool.query(updateIsChangedQuery, [id]);
		}

		res.json({ message: 'Task updated successfully' });
	} catch (error) {
		console.error('Error updating task', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	getTasks,
	createTask,
	updateTask,
};
