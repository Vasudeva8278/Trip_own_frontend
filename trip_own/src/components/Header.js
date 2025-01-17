import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import './css/header.css'; // Assuming styles are in 'src/css/header.css'
import Profile from '../pages/Profile';

const Header = () => {
  const [showProfileCard, setShowProfileCard] = useState(false); // Control profile card visibility
  const navigate = useNavigate(); // Navigation hook for redirection

  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="https://i0.wp.com/ridenepal.co.uk/wp-content/uploads/2020/01/pngkey.com-tire-track-png-560136.jpg-e1581087476934.png?ssl=1"
          alt="Logo"
          className="logo"
        />
        <h1>Trip to Road</h1>
      </div>
      <div className="header-right">
        <div className="profile-container">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
            alt="Profile Icon"
            className="profile-icon"
            onClick={() => setShowProfileCard(true)} // Open the profile card on click
          />
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Conditional rendering of the Profile component */}
      {showProfileCard && (
        <div className="profile-card-modal">
          <Profile />
          <button
            className="btn btn-close"
            onClick={() => setShowProfileCard(false)}
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
