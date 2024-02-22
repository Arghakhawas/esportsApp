// UserProfile.js

import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import ChangePasswordModal from './ChangePasswordModel';
import bgmi from "../assets/bgmi.png";
import Cute from "../assets/Cute.png";
import deathking from "../assets/deathking.png";
import itachiuchiha from "../assets/itachiuchiha.png";
import Naruto from "../assets/naruto.png";
import narutoteacher from "../assets/narutoteacher.png";
import onepiece from "../assets/onepiece.png";
import sauske from "../assets/sauske.png";
import sexy from "../assets/sexy.png";
import sexy2 from "../assets/sexy2.png";
const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
  const [avatarOptions, setAvatarOptions] = useState([
    { src: bgmi, alt: 'BGMI Avatar', id: 'bgmi' },
    { src: Cute, alt: 'CUTE Avatar', id: 'Cute' },
    { src: deathking, alt: 'DEATHKING AVATAR', id: 'deathking' },
    { src: itachiuchiha, alt: 'ITACHI Avatar', id: 'itachi' },
    { src: Naruto, alt: 'NARUTO Avatar', id: 'Naruto' },
    { src: narutoteacher, alt: 'NARUTOTEACHER AVATAR', id: 'narutoteacher' },
    { src: onepiece, alt: 'ONCEPIECE AVATAR', id: 'onepiece' },
    { src: sauske, alt: 'SAUSKE AVATAR', id: 'sauske' },
    { src: sexy, alt: 'SEXY AVATAR', id: 'sexy' },
    { src: sexy2, alt: 'SEXY2 AVATAR', id: 'sexy2' },
    { src: sukuna, alt: 'SUKUNA AVATAR', id: 'sukuna' },
    { src: sukunaevil, alt: 'SUKUNAEVIL AVATAR', id: 'sukuna' },
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

  const handleToggleAvatarSelection = () => {
    setShowAvatarSelection(!showAvatarSelection);
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
            <button onClick={handleToggleAvatarSelection}>Choose Avatar</button>
            {showAvatarSelection && (
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
            )}
          </div>

          <p className="profile-info">Name: {profileData.username}</p>
          <p className="profile-info">Email: {profileData.email}</p>
          <p className="profile-info">Refer id: {profileData.referId}</p>
          <p className="profile-info">Number: {profileData.number}</p>
          <p className="profile-info">Tournament Matches Played: {profileData.tournamentMatchesPlayed}</p>

          <div className="avatar-buttons">
            <button onClick={handleOpenChangePasswordModal}>Change Password</button>
            <button onClick={handleCloseChangePasswordModal}>Cancel</button>
          </div>
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
