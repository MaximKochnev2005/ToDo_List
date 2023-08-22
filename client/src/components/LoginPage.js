import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(username, password);
	};

	return (
		<div className="login-page">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label>Username:</label>
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="input-group">
					<label>Password:</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">Login</button>
			</form>
			{error && <p className="error">{error}</p>}
		</div>
	);
}

export default LoginPage;
