// LiveViewer.js
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ErrorIndicator from './ErrorIndicator'; // New component for error handling
import { useAppContext } from '../context/AppContext'; // New context hook

const LiveViewer = () => {
  const { setError } = useAppContext(); // New context hook usage
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = io('https://esportsappbackend.onrender.com/api/livestreaming');

    socket.on('stream', (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    socket.on('connect_error', (error) => {
      setError('Socket connection error: ' + error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [setError]);

  return (
    <div>
      <h1>Live Screen</h1>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
      <ErrorIndicator /> {/* New component for displaying errors */}
    </div>
  );
};

export default LiveViewer;
