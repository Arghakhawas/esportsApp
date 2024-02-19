// UserProfile.js
import React, { useEffect, useState } from 'react';
import './UserProfile.css';
const UserProfile = ({}) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile', {
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

  return (
    <div className="user-profile-container">
      <h2 className="profile-heading">User Profile</h2>
      {profileData && (
        <div className="profile-details">
          <p className="profile-info">Name: {profileData.username}</p>
          <p className="profile-info">Email: {profileData.email}</p>
          <p className="profile-info">Refer id: {profileData.referId}</p>
          <p className="profile-info">Number: {profileData.number}</p>
          <p className="profile-info">Tournament Matches Played: {profileData.tournamentMatchesPlayed}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
