import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HeaderNav from "./components/HeaderNav";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Restaurants from "./pages/Restaurants";
import Spots from "./pages/Spots";
import LoginForm from "./pages/LoginForm"; // Assuming LoginForm component exists


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data here

  // Handle successful login
  const handleLogin = (userData) => {
    setUser(userData); // Set user data after successful login
    setIsLoggedIn(true); // Update login state
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user data
    setIsLoggedIn(false); // Update login state
  };

  useEffect(() => {
    // Check if user is already logged in (e.g., via localStorage or API)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

        {/* Navigation Bar */}
        <HeaderNav />

        {/* Main Content Section */}
        <main>
          {/* Conditionally render Profile or LoginForm based on login state */}
         

          {/* Routes for different pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/spots" element={<Spots />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
