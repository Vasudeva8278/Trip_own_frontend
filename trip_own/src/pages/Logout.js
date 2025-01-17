import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Remove username and JWT token from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('jwtToken');

    // Redirect to login page after logout
    window.location.href = '/login';  // Or use React Router
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
