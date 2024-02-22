import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const LiveViewer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = io('https://esportsappbackend.onrender.com');

    socket.on('stream', (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Live Screen</h1>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
    </div>
  );
};

export default LiveViewer;
