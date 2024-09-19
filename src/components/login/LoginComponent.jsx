import React, { useState } from 'react';
import axios from 'axios';
import './LoginComponent.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request...'); // Debugging statement
      const response = await axios.post('http://localhost:8085/api/login', { username, password });
      console.log('Login response:', response.data); // Check if the response is coming back

      // Check if the response contains JWT and role
      if (response.data.jwt && response.data.role) {
        // Store JWT in localStorage
        localStorage.setItem('authToken', response.data.jwt);
        console.log('Token stored:', response.data.jwt); // Debugging statement

        // Redirect based on the role
        if (response.data.role === 'Admin') {
          navigate('/dashbord'); // Redirect to admin dashboard
        } else if (response.data.role === 'Employee') {
          navigate('/employee'); // Redirect to employee page
        } else {
          setError('Unknown role. Please contact support.');
        }
      } else {
        setError('Login failed: No token or role received.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login error. Please check your credentials.');
    }
  };

  return (
    <div className='login-background'>
      <div className='login-container'>
        <h2 className='login-title'>Login</h2>
        {error && <p className='login-error'>{error}</p>}
        <form className='login-form' onSubmit={handleLogin}>
          <div className='form-group'>
            <label className='form-label'>Username:</label>
            <input
              type='text'
              className='form-input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Password:</label>
            <input
              type='password'
              className='form-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='login-button'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;