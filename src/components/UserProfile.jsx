// UserProfile.js

import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import ChangePasswordModal from './ChangePasswordModel';
import bgmi from "../assets/bgmi.png";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
  const [avatarOptions, setAvatarOptions] = useState([
    { src: bgmi, alt: 'BGMI Avatar', id: 'bgmi' },
    { src: 'avatar_url_2.jpg', alt: 'Avatar 2', id: 'avatar2' },
    { src: bgmi, alt: 'BGMI Avatar', id: 'bgmi' },
    { src: 'avatar_url_2.jpg', alt: 'Avatar 2', id: 'avatar2' },  
    { src: bgmi, alt: 'BGMI Avatar', id: 'bgmi' },
    { src: 'avatar_url_2.jpg', alt: 'Avatar 2', id: 'avatar2' },
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setProfileData(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAvatarSelection = (index) => {
    setSelectedAvatarIndex(index);
  };

  const generateProfileAvatar = (name) => {
    return name.slice(0, 10);
  };

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div className="user-profile-container">
      <h2 className="profile-heading">User Profile</h2>
      {profileData && (
        <div className="profile-details">
       
          <img
            src={avatarOptions[selectedAvatarIndex]?.src || `https://ui-avatars.com/api/?name=${generateProfileAvatar(profileData.username)}&background=random`}
            alt="Profile"
            className="profile-picture"
          />

          {/* Avatar selection section */}
          <div className="avatar-selection">
            <h3>Choose Avatar</h3>
            <div className="avatar-options">
              {avatarOptions.map((avatar, index) => (
                <img
                  key={avatar.id}
                  src={avatar.src}
                  alt={avatar.alt}
                  className={`small-avatar ${selectedAvatarIndex === index ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelection(index)}
                />
              ))}
            </div>
            <div className="avatar-buttons">
              <button onClick={handleOpenChangePasswordModal}>Change Password</button>
              <button onClick={handleCloseChangePasswordModal}>Cancel</button>
            </div>
          </div>

          <p className="profile-info">Name: {profileData.username}</p>
          <p className="profile-info">Email: {profileData.email}</p>
          <p className="profile-info">Refer id: {profileData.referId}</p>
          <p className="profile-info">Number: {profileData.number}</p>
          <p className="profile-info">Tournament Matches Played: {profileData.tournamentMatchesPlayed}</p>

          {/* Add a button to trigger the change password modal */}
          <button onClick={handleOpenChangePasswordModal}>Change Password</button>
        </div>
      )}

      {/* Render the ChangePasswordModal when needed */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          userId={profileData._id} // Pass the user ID to the modal component
          onClose={handleCloseChangePasswordModal}
        />
      )}
    </div>
  );
};

export default UserProfile;
