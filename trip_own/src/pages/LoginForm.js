import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for routing
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import

function Login({ setIsAuthenticated, setUsername }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);
      console.log('Login Response:', response.data);
      
      // Decode the token to get the username
      const decodedToken = jwtDecode(response.data.token);

      // Store the username and JWT token in localStorage
      localStorage.setItem('username', decodedToken.username);
      localStorage.setItem('jwtToken', response.data.token);

      // Set the username and authentication state
      setUsername(decodedToken.username);
      setIsAuthenticated(true);

      // Navigate to home or dashboard
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignInRedirect = () => {
    navigate('/signin'); // Navigate to the sign-in route
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit" style={{ marginTop: '10px' }}>
            Login
          </button>
        </form>
        <button
          style={{
            marginTop: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={handleSignInRedirect}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
