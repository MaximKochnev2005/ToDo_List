const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const tasksRoute = require('./routes/tasks');
const authRoute = require('./routes/auth');

app.use('/tasks', tasksRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
