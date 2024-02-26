// ErrorIndicator.js
import React from 'react';
import { useAppContext } from '../context/AppContext';

const ErrorIndicator = () => {
  const { error, setError } = useAppContext();

  const handleDismiss = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default ErrorIndicator;
