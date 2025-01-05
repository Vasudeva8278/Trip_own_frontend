import React, { useState, useEffect } from 'react';

const Hotels = () => {
  // State to manage hotel data and loading state
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login status
  const [showLoginModal, setShowLoginModal] = useState(false); // Toggle login modal

  // Fetch hotel data from the backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:4000/hotel/get');
        if (!response.ok) {
          console.warn('Failed to fetch data:', response.statusText);
          return;
        }
        const result = await response.json();

        // Ensure the response contains data
        if (result.data && Array.isArray(result.data)) {
          setHotels(result.data);
        } else {
          console.warn('Unexpected API response structure:', result);
        }
      } catch (err) {
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();

    // Simulate login check
    // Replace this with an actual API call to check user authentication
    setIsLoggedIn(localStorage.getItem('authToken') ? true : false);
  }, []);

  // Handle "Book Now" button click
  const handleBookNow = (hotelId) => {
    if (isLoggedIn) {
      // Redirect to the booking page
      alert(`Redirecting to booking page for hotel ID: ${hotelId}`);
      // Example: window.location.href = `/book/${hotelId}`;
    } else {
      // Show login modal
      setShowLoginModal(true);
    }
  };

  // Display a loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '45px' }}>
 
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0px' }}>
        {hotels.length === 0 ? (
          <p>No hotels available at the moment.</p>
        ) : (
          hotels.map((hotel) => (
            <div
              key={hotel._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '0px',
                textAlign: 'center',
                width: '25rem', // Adjust width of the box
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginRight: '20px', // Margin for spacing
                marginBottom: '20px', // Space between rows
              }}
            >
              <img
                src={hotel.photourl}
                alt={hotel.name}
                style={{
                  width: '100%',
                  height: '200px', // Set image height
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              />
              <h3>{hotel.name}</h3>
              <p>Price/Day: ₹{hotel.per_day}</p>
              <p>Rating: {hotel.rating} ⭐</p>
            
            </div>
          ))
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
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
            <h2>Login Required</h2>
            <p>You must log in to book a hotel.</p>
            <button
              onClick={() => setShowLoginModal(false)}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
