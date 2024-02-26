// LiveViewer.js
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const LiveViewer = ({ tournamentId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = io('https://esportsappbackend.onrender.com/api/livestreaming');

    socket.on('stream', (stream, id) => {
      if (videoRef.current && id === tournamentId) {
        videoRef.current.srcObject = stream;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [tournamentId]);

  return (
    <div>
      <h1>Live Screen</h1>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
    </div>
  );
};

export default LiveViewer;
