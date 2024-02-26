// ConfirmationDialog.js
import React from 'react';

const ConfirmationDialog = ({ message, onYes, onNo }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onYes}>Yes</button>
      <button onClick={onNo}>No</button>
    </div>
  );
};

export default ConfirmationDialog;
