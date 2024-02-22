import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';

const LiveViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('https://esportsappbackend.onrender.com/api/livestreming');

    socket.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Listen for the 'stream' event to display the live stream
    socket.current.on('stream', (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    // Listen for the 'stopStream' event to stop the live stream
    socket.current.on('stopStream', () => {
      stopLiveStream();
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const stopLiveStream = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div>
      <h1>Live Viewer</h1>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
    </div>
  );
};

export default LiveViewer;
