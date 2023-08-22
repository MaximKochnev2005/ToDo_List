import React, { useState } from 'react';
import { useTasksContext } from '../hooks/useTaskContext';
import {useAuthContext} from "../hooks/useAuthContext";

function TaskItem({ task }) {
	const { dispatch } = useTasksContext();
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(task.text);
	const {user} = useAuthContext()


	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = async () => {
		try {
			const response = await fetch(`http://localhost:4000/tasks/${task.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${user.token}`,
				},
				body: JSON.stringify({ text: editedText, status: task.status }),
			});

			if (response.ok) {
				setIsEditing(false);
			} else {
				console.error('Error updating task');
			}
		} catch (error) {
			console.error('Error updating task', error);
		}
		setIsEditing(false);
	};

	const handleCompleteClick = async () => {
		try {
			const response = await fetch(`http://localhost:4000/tasks/${task.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${user.token}`,
				},
				body: JSON.stringify({ text: editedText, status: !task.status }),
			});

			if (response.ok) {
				setIsEditing(false);
				// Ваш код для обновления состояния задачи
			} else {
				console.error('Error updating task');
			}
		} catch (error) {
			console.error('Error updating task', error);
		}
		setIsEditing(false);
	};

	return (
		<div className={`task ${task.status ? 'completed' : ''}`}>
			<h3>{task.user_name}</h3>
			{isEditing ? (
				<textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
			) : (
				<p>{task.text}</p>
			)}
			<p>Email: {task.email}</p>
			<p>Status: {task.status ? 'Completed' : 'Pending'}</p>
			{!task.status && (
				<div className="edit-buttons">
					<button onClick={handleEditClick}>Edit</button>
					{isEditing && <button className="save-button" onClick={handleSaveClick}>Save</button>}
					<button onClick={handleCompleteClick}>Complete</button>
				</div>
			)}
		</div>
	);
}

export default TaskItem;
