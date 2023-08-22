import React, { useState } from 'react';
import { useTasksContext } from '../hooks/useTaskContext';

function TaskForm() {
	const { dispatch } = useTasksContext();
	const [user_name, setUser_name] = useState('');
	const [email, setEmail] = useState('');
	const [text, setText] = useState('');
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		let newErrors = {};

		if (!user_name) {
			newErrors.user_name = 'User Name is required';
		}

		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
			newErrors.email = 'Invalid email format';
		}

		if (!text) {
			newErrors.text = 'Task Text is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			const newTask = {
				user_name,
				email,
				text,
			};

			fetch('https://todo-r9sb.onrender.com/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTask),
			})
				.then((response) => response.json())
				.then(() => {
					dispatch({ type: 'CREATE_TASK', payload: newTask });
					setUser_name('');
					setEmail('');
					setText('');
				})
				.catch((error) => console.error('Error creating task', error));
		}
	};

	return (
		<div className="task-form">
			<h2>Create Task</h2>
			<form onSubmit={handleSubmit}>
				{errors.user_name && <p className="error">{errors.user_name}</p>}
				<input
					type="text"
					placeholder="User Name"
					value={user_name}
					onChange={(e) => setUser_name(e.target.value)}
				/>
				{errors.email && <p className="error">{errors.email}</p>}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.text && <p className="error">{errors.text}</p>}
				<textarea
					placeholder="Task Text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button type="submit">Create Task</button>
			</form>
		</div>
	);
}

export default TaskForm;
