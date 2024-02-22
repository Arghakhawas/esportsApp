
import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import ChangePasswordModal from './ChangePasswordModel';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

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
  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
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
            src={selectedAvatar || `https://ui-avatars.com/api/?name=${generateProfileAvatar(profileData.username)}&background=random`}
            alt="Profile"
            className="profile-picture"
          />

          {/* Avatar selection section */}
          <div className="avatar-selection">
            <h3>Choose Avatar</h3>
            <div className="avatar-options">
              <img
                src="avatar_url_1.jpg"
                alt="Avatar 1"
                onClick={() => handleAvatarSelection("avatar_url_1.jpg")}
              />
              <img
                src="avatar_url_2.jpg"
                alt="Avatar 2"
                onClick={() => handleAvatarSelection("avatar_url_2.jpg")}
              />
              {/* Add more avatars as needed */}
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