import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginForm';
import Signin from './pages/SignInForm';
import HomePage from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Book from './pages/Book';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import Spots from './pages/Spots';
import HeaderNav from './components/HeaderNav';
import Header from './components/Header';
import MyOrders from './pages/MyOrders';

const App = () => {
  // Check if the user is authenticated from localStorage or default to false
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    // Sync state with localStorage whenever authentication changes
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
    }
  }, [isAuthenticated, username]);

  // Logout function to destroy the session and reset authentication state
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      {/* Conditionally render HeaderNav and Header only when the user is authenticated */}
      {isAuthenticated && <Header isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />}
      {isAuthenticated && <HeaderNav isAuthenticated={isAuthenticated} username={username} />}
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />}
        />
        {/* Signin Route */}
        <Route
          path="/signin"
          element={<Signin setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />}
        />
        {/* Home Route (Private) */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </PrivateRoute>
          }
        />
        {/* Dynamic Booking Route */}
        <Route
          path="/booking/:vehicleId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Book />
            </PrivateRoute>
          }
        />
        {/* Hotels Route (Private) */}
        <Route
          path="/hotels"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Hotels />
            </PrivateRoute>
          }
        />
        {/* Restaurants Route (Private) */}
        <Route
          path="/restaurants"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Restaurants />
            </PrivateRoute>
          }
        />
        {/* Spots Route (Private) */}
        <Route
          path="/spots"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Spots />
            </PrivateRoute>
          }
        />

<Route
          path="/myorder"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MyOrders />
            </PrivateRoute>
          }
        />
      </Routes>

      
    </Router>
  );
};

export default App;