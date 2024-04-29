import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';
import { useNavigate } from 'react-router-dom';
import config from '../config'; 


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/signup`, { username, password });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            setErrorMessage("Username already exists. Please choose a different one.");
            break;
          default:
            setErrorMessage("Error during registration. Please try again later.");
            break;
        }
      } else {
        // Handle network error or no response from server
        setErrorMessage("Unable to connect to the server. Please try again later.");
      }
    }
  }

  return (
    <div className="auth-container">
      <h2>Become a pretentious quoter</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type="submit">Sign up</button>
        {errorMessage && <div className="feedback-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignUp;
