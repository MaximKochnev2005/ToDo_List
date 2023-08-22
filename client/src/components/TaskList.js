import React, {useEffect, useState} from 'react';
import {useTasksContext} from "../hooks/useTaskContext";
import {Link} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import {useLogout} from "../hooks/useLogout";
import TaskItem from "./TaskItem";


function TaskList() {
	const {tasks, dispatch} = useTasksContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState('user_name');
	const {user} = useAuthContext()
	const {logout} = useLogout()

	useEffect(() => {
		fetch(`https://todo-r9sb.onrender.com/tasks?page=${currentPage}&sortBy=${sortBy}`)
			.then((response) => response.json())
			.then((data) => {
				dispatch({type: 'SET_TASKS', payload: data});
			})
			.catch((error) => console.error('Error fetching tasks', error));
	}, [currentPage, sortBy]);

	const handlePageChange = (newPage) => {
		if (newPage >= 1) {
			setCurrentPage(newPage);
		}
	};

	const handleSortChange = (e) => {
		setSortBy(e.target.value);
	};

	return (
		<div className="task-list">
			<h2>Task List</h2>
			<div className="sort-dropdown">
				<label>Sort by:</label>
				<select value={sortBy} onChange={handleSortChange}>
					<option value="user_name">User Name</option>
					<option value="email">Email</option>
					<option value="status">Status</option>
				</select>
			</div>
			<ul>
				{tasks?.map((task) => (
					<TaskItem key={task.id} task={task}/>
				))}
			</ul>
			<div className="pagination">
				<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
					Предыдущая
				</button>
				<span>{currentPage}</span>
				<button onClick={() => handlePageChange(currentPage + 1)}>
					Следующая
				</button>
			</div>
			{!user ? <Link to="/login">Go to Login</Link> : <Link onClick={() => logout()}>Logout</Link>}
		</div>
	);
}

export default TaskList;

