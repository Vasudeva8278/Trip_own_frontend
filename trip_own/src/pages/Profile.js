import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa"; // Notification and user icon
import './css/ProfileBox.css'; // Custom CSS for styling

const Profile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Replace with your actual local storage key
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="user-icon">
          <FaUserCircle size={50} />
        </div>
        <h2 className="username" style={{"color":"black","backgroundColor":"white"}}
        >{username || "Username"}</h2>
      </div>
      <div className="order-info">
        <h3>My Orders</h3>
        <FaBell size={20} className="notification-icon" />
      </div>
    </div>
  );
};

export default Profile;
