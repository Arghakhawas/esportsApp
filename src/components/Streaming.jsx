import React, { useState, useRef, useEffect } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import io from 'socket.io-client';

const Streaming = () => {
  const socket = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [isScreenCapturing, setIsScreenCapturing] = useState(false);

  useEffect(() => {
    socket.current = io('https://esportsappbackend.onrender.com/api/livestreming', {
      transports: ['websocket'],
    });

    socket.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const startScreenCapture = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((screenStream) => {
        socket.current.emit('stream', screenStream);
        setIsLive(true);
        setIsScreenCapturing(true);
      })
      .catch((error) => {
        console.error('Error capturing screen:', error);
      });
  };

  const stopScreenCapture = () => {
    const screenStream = new MediaStream();
    socket.current.emit('stopStream');
    setIsLive(false);
    setIsScreenCapturing(false);
  };

  return (
    <div>
      <h1>Live Streaming</h1>
      {isLive ? (
        <div>
          <div>Recording Time: {isScreenCapturing ? 'Recording...' : 'Not Recording'}</div>
          <button onClick={stopScreenCapture}>Stop Live</button>
        </div>
      ) : (
        <div>
          <button onClick={startScreenCapture}>Start Live</button>
        </div>
      )}
    </div>
  );
};

export default Streaming;
