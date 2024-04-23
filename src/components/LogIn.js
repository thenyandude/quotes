import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import '../css/AuthForm.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const { setIsLoggedIn, setUsername, setUserId } = useAuth(); // Update to include setUserId
  const [loginUsername, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username: loginUsername, password });
      if (response.status === 200) {
      setIsLoggedIn(true);
      setUsername(loginUsername);
      setUserId(response.data.userId); // Store the user ID in the context
      localStorage.setItem('userId', response.data.userId); // Store the user ID in local storage
      navigate('/home'); // Redirect to home on successful login
    }
  } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in');
    }
  };
  

  return (
    <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
            <label>
                Username:
                <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            {errorMessage && <div className="feedback-message">{errorMessage}</div>}
        </form>
    </div>
);
}

export default Login;
