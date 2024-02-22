// ChangePasswordModal.js
import React, { useState } from 'react';
import './Changepassword.css';

const ChangePasswordModal = ({ userId, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      // Make a request to your backend to change the password
      const response = await fetch('https://esportsappbackend.onrender.com/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId,
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      // Password changed successfully, you might want to handle this accordingly
      console.log('Password changed successfully');

      // Close the modal
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="change-password-modal">
      <h3>Change Password</h3>
      <label>
        Old Password:
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      </label>
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePasswordModal;
