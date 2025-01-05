import React, { useState } from 'react';
import './css/header.css'; // Assuming the styles are in 'src/css/header.css'
import LoginForm from '../pages/LoginForm'; // Import LoginForm component
import SignInForm from '../pages/SignInForm'; // Import SignInForm component
import NotificationPage from '../pages/NotificationPage'; // Import NotificationPage component
import CartPage from '../pages/CartPage'; // Import CartPage component

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [username, setUsername] = useState(''); // Store username or profile name

  const handleLogin = (username) => {
    setUsername(username); // Set the username after login
    setIsLoggedIn(true); // Set user as logged in
    setShowLogin(false); // Close the login modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    alert('Logged out successfully');
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
        {!isLoggedIn ? (
          <>
            <button className="btn btn-primary" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn btn-secondary" onClick={() => setShowSignIn(true)}>Sign Up</button>
          </>
        ) : (
          <div className="profile-container">
            <div className="profile-icon-container">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
                alt="Profile Icon"
                className="profile-icon"
              />
              {/* Display username below the user icon */}
              <span className="profile-username">{username}</span>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        <div className="icons">
          <img
            src="https://img.icons8.com/ios/50/000000/appointment-reminders.png"
            alt="Notification"
            className="icon"
            onClick={() => setShowNotification(true)} // Show notification page on click
          />
          <img
            src="https://img.icons8.com/material-outlined/24/000000/shopping-cart.png"
            alt="Cart"
            className="icon"
            onClick={() => setShowCart(true)} // Show cart page on click
          />
        </div>
      </div>

      {/* Show Login Form as a Card-like Modal */}
      {showLogin && (
        <LoginForm
          show={showLogin}
          onClose={() => setShowLogin(false)}
          setShowSignIn={setShowSignIn}
          setIsLoggedIn={handleLogin} // Pass the handleLogin function to set username
        />
      )}

      {/* Show Sign Up Form Modal */}
      {showSignIn && <SignInForm show={showSignIn} onClose={() => setShowSignIn(false)} />}

      {/* Show Notification Page */}
      {showNotification && <NotificationPage />}

      {/* Show Cart Page */}
      {showCart && <CartPage />}
    </header>
  );
};

export default Header;
