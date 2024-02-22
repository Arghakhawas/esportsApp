import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import ChangePasswordModal from './ChangePasswordModel';
import bgmi from "../assets/bgmi.png";
import Cute from "../assets/Cute.png";
import deathking from "../assets/deathking.png";
import Itachiuchiha from "../assets/Itachiuchiha.png";
import Naruto from "../assets/Naruto.png";
import narutoteacher from "../assets/narutoteacher.png";
import onepiece from "../assets/onepiece.png";
import sauske from "../assets/sauske.png";
import sexy from "../assets/sexy.png";
import sexy2 from "../assets/sexy2.png";
import sukuna from "../assets/sukuna.png";
import sukunaevil from "../assets/sukunaevil.png";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(profileData?.avatar || avatarOptions[0]);

  const avatarOptions = [
    { src: bgmi, alt: 'BGMI AVATAR', id: 'bgmi' },
    { src: Cute, alt: 'CUTE AVATAR', id: 'Cute' },
    { src: deathking, alt: 'DEATHKING AVATAR', id: 'deathking' },
    { src: Itachiuchiha, alt: 'ITACHIUCHIHA AVATAR', id: 'Itachiuchiha' },
    { src: Naruto, alt: 'NARUTO AVATAR', id: 'Naruto' },
    { src: narutoteacher, alt: 'NARUTOTEACHER AVATAR', id: 'narutoteacher' },
    { src: onepiece, alt: 'ONCEPIECE AVATAR', id: 'onepiece' },
    { src: sauske, alt: 'SAUSKE AVATAR', id: 'sauske' },
    { src: sexy, alt: 'SEXY AVATAR', id: 'sexy' },
    { src: sexy2, alt: 'SEXY2 AVATAR', id: 'sexy2' },
    { src: sukuna, alt: 'SUKUNA AVATAR', id: 'sukuna' },
    { src: sukunaevil, alt: 'SUKUNAEVIL AVATAR', id: 'sukunaevil' },
  ];

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

  const saveSelectedAvatar = async () => {
    try {
      const response = await fetch('https://esportsappbackend.onrender.com/api/profile/avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ avatar: selectedAvatar.id }), // Send the avatar id
      });

      if (!response.ok) {
        throw new Error('Failed to save avatar');
      }

      // Avatar saved successfully
    } catch (error) {
      console.error('Error saving avatar:', error);
    }
  };

  useEffect(() => {
    if (selectedAvatar) {
      saveSelectedAvatar();
    }
  }, [selectedAvatar]);

  const generateProfileAvatar = (name) => {
    return name.slice(0, 12);
  };

  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
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
           src={selectedAvatar?.src}
           alt="Profile"
           className="profile-picture"
          />

          {/* Avatar selection section */}
          <div className="avatar-selection">
            <button onClick={handleToggleAvatarSelection}>Choose Avatar</button>
            {showAvatarSelection && (
              <div className="avatar-options">
                {avatarOptions.map((avatar) => (
                  <img
                    key={avatar.id}
                    src={avatar.src}
                    alt={avatar.alt}
                    className={`small-avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                    onClick={() => handleAvatarSelection(avatar)}
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
        <ChangePasswordModal userId={profileData?._id} onClose={handleCloseChangePasswordModal} />
      )}
    </div>
  );
};

export default UserProfile;
