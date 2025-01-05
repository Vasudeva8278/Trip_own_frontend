import React from 'react';
import './css/ProfileBox.css';

const ProfileBox = ({ profileImage, username }) => {
  return (
    <div className="profile-box">
      <div className="profile-icon">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="username">{username}</div>
    </div>
  );
};

export default ProfileBox;
