// src/pages/Book.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [formData, setFormData] = useState({
    username: '',       // The logged-in username will be populated here
    vehicleName: '',
    pricePerDay: '',
    numberOfDays: '',
    vehicleNumber: '',
    mobileNumber: '',
  });

  const [error, setError] = useState('');

  // Simulating logged-in user data (you should replace this with actual data from a context or API)
  useEffect(() => {
    // Assuming you have a way to get the logged-in user's username (e.g., from localStorage, context, etc.)
    const loggedInUsername = localStorage.getItem('username'); // Just an example, replace with actual logic

    if (loggedInUsername) {
      setFormData((prevData) => ({
        ...prevData,
        username: loggedInUsername,  // Set the logged-in username
      }));
    }
  }, []);

  // Handle input field changes
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
      // Sending POST request with form data
      const response = await axios.post('http://localhost:4000/api/book', formData);

      if (response.status === 200) {
        alert('Booking successful');
        // Optionally reset the form or do other actions
      }
    } catch (error) {
      console.error('Error while booking:', error.response?.data || error.message);
      setError('Error while submitting the form. Please try again.');
    }
  };

  return (
    <div className="book-form-container">
      <h2>Book a Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}  // Pre-filled with logged-in username
            onChange={handleChange}
            required
            disabled  // Disable this field as it's pre-filled from login
          />
        </div>
        <div className="input-group">
          <label htmlFor="vehicleName">Vehicle Name</label>
          <input
            type="text"
            id="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="pricePerDay">Price Per Day</label>
          <input
            type="number"
            id="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="numberOfDays">Number of Days</label>
          <input
            type="number"
            id="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="vehicleNumber">Vehicle Number</label>
          <input
            type="text"
            id="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn">Book Now</button>
      </form>
    </div>
  );
};

export default BookForm;
