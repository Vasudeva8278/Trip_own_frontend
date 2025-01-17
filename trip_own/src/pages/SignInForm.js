import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin({ setIsAuthenticated, setUsername }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Form Data:', formData); // Log the form data
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', formData);
      console.log('Sign-in Response:', response.data);

      // Redirect to login page after successful registration
      alert('Registration successful! Please log in.');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Sign-in failed:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data); // Log server response for detailed debugging
      }
      alert('Registration failed. Please check your input and try again.');
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUHIYAENLxUlVE8R_gGJE-MeG6svnRKjl3Q&s') no-repeat center center/cover",
        position: "relative",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br></br>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br></br>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br></br>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br></br>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
