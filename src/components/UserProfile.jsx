
import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import ChangePasswordModal from './ChangePasswordModel';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

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
          {/* Display User Profile Picture */}
          <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />

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