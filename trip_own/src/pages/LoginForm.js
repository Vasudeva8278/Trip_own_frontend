import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './css/loginForm.css'; // Assuming the CSS is in 'src/css/loginForm.css'

const LoginForm = ({ show, onClose, setShowSignIn, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',  // We combine email or username into one field
    password: '',
  });

  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username: formData.usernameOrEmail,
        password: formData.password,
      });

      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true, formData.usernameOrEmail); // Pass username to parent (Header)
        alert('Login successful');
        onClose(); // Close the modal after successful login
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={`login-form-container ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="login-form-card" onClick={(e) => e.stopPropagation()}>
        <div className="login-header">
          <h2>Login</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="usernameOrEmail">Email or Username</label>
            <input
              type="text"
              id="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">Login</button>
        </form>

        <div className="signup-section">
          <p>Don't have an account?</p>
          <button
            className="btn"
            onClick={() => setShowSignIn(true)} // Trigger Sign In Form
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
