// LiveViewer.js
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const LiveViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('https://esportsappbackend.onrender.com/api/livestreaming');

    socket.current.on('stream', (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    socket.current.on('connect_error', () => {
      console.error('Socket connection error');
    });

    return cleanupSocket;
  }, []);

  const cleanupSocket = () => {
    if (socket.current) {
      socket.current.disconnect();
    }
  };

  return (
    <div>
      <h1>Live Screen</h1>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
    </div>
  );
};

export default LiveViewer;
