import React, { useState, useEffect } from 'react';

import LoginForm from './LoginForm'; // Assuming the LoginForm component is correctly set up and styled

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showLogin, setShowLogin] = useState(false); // Toggle login modal
  const [showBookingForm, setShowBookingForm] = useState(false); // Show booking form
  const [bookingData, setBookingData] = useState({
    vehicleName: '',
    vehicleNumber: '',
    pricePerDay: '',
    numberOfDays: 1,
    mobileNumber: '',
  });

  const [username, setUsername] = useState(''); // Store username

  // Fetch vehicle data from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:4000/vehicles/get');
        if (!response.ok) {
          console.warn('Failed to fetch data:', response.statusText);
          return;
        }
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setVehicles(result.data);
        } else {
          console.warn('Unexpected API response structure:', result);
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

    // Simulate login check
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(token ? true : false);
    if (token) {
      setUsername(localStorage.getItem('username')); // Fetch and set username if logged in
    }
  }, []);

  // Handle login action
  const handleLogin = (profileName) => {
    setUsername(profileName); // Set the username from LoginForm
    setIsLoggedIn(true); // Mark user as logged in
    localStorage.setItem('authToken', 'someAuthToken'); // Save auth token to localStorage (or retrieve it from API)
    localStorage.setItem('username', profileName); // Save username to localStorage
    setShowLogin(false); // Close login modal
  };

  // Handle logout action
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    alert('Logged out successfully');
  };

  // Handle "Book Now" button click
  const handleBookNow = (vehicle) => {
    if (isLoggedIn) {
      setBookingData({
        vehicleName: vehicle.name,
        vehicleNumber: vehicle.vehicle_number,
        pricePerDay: vehicle.price_of_rent_per_day,
        numberOfDays: 1,
        mobileNumber: '',
      });
      setShowBookingForm(true);
    } else {
      setShowLogin(true); // Show login form if not logged in
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Booking data:', bookingData);
    setShowBookingForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
        {vehicles.length === 0 ? (
          <p>No vehicles available at the moment.</p>
        ) : (
          vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '0px',
                textAlign: 'center',
                width: '250px',
                height: '20rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginRight: '20px',
                marginBottom: '20px',
              }}
            >
              <img
                src={vehicle.photourl}
                alt={vehicle.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              />
              <h3>{vehicle.name}</h3>
              <p>Vehicle Number: {vehicle.vehicle_number}</p>
              <p>Price/Day: ₹{vehicle.price_of_rent_per_day}</p>
              <button
                onClick={() => handleBookNow(vehicle)}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>

      {/* Show Login Form */}
      {showLogin && (
        <LoginForm
          show={showLogin}
          onClose={() => setShowLogin(false)}
          setIsLoggedIn={handleLogin} // Pass handleLogin to update login state
        />
      )}

      {/* Show Booking Form */}
      {showBookingForm && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2>Booking Form</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>Vehicle Name: {bookingData.vehicleName}</label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Vehicle Number: {bookingData.vehicleNumber}</label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Price/Day: ₹{bookingData.pricePerDay}</label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Number of Days:</label>
                <input
                  type="number"
                  name="numberOfDays"
                  value={bookingData.numberOfDays}
                  onChange={handleInputChange}
                  min="1"
                  style={{ padding: '5px', width: '100px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Mobile Number:</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={bookingData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  style={{ padding: '5px', width: '100%' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Submit Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
