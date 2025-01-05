// src/pages/SignInForm.js
import React, { useState } from 'react';
import axios from 'axios';  // Import axios for API requests
import './css/signInForm.css';  // Assuming the styles are in 'src/css/signInForm.css'

const SignInForm = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
 
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      if (response.data.message === 'User registered successfully') {
        alert('Registration successful');
        onClose(); // Close the modal after successful registration
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className={`sign-in-form-container ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="sign-in-form-card" onClick={(e) => e.stopPropagation()}>
        <div className="sign-in-header">
          <h2>Sign Up</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
