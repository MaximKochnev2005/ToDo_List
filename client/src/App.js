import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useAuthContext} from "./hooks/useAuthContext";
import LoginPage from "./components/LoginPage";


function App() {
	const {user} = useAuthContext()

	return (
		<div className="App">
			<header className="header">
				<h1>Task Manager</h1>
			</header>
			<Routes>
				<Route path="/" element={
					<div className="container">
						<TaskList/>
						<TaskForm/>
					</div>
				}/>
				<Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"}/>}/>
			</Routes>
		</div>
	);
}

export default App;
