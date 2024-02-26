// Streaming.js
import React, { useState, useEffect, useRef } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import io from 'socket.io-client';
import ConfirmationDialog from './ConfirmationDialog'; // New component for confirmation dialog
import ErrorIndicator from './ErrorIndicator'; // New component for error handling


const Streaming = () => {
  
  const socket = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [isScreenCapturing, setIsScreenCapturing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    socket.current = io('https://esportsappbackend.onrender.com/api/livestreaming');

    socket.current.on('connect_error', (error) => {
      setError('Socket connection error: ' + error.message);
    });

    socket.current.on('stream', (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        startTimer();
      }
    });

    socket.current.on('stopStream', () => {
      stopTimer();
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [setError]);

  const timerRef = useRef(null);

  const startTimer = () => {
    setIsLive(true);
    setIsScreenCapturing(true);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setRecordingTime(0);
    setIsLive(false);
    setIsScreenCapturing(false);
  };

  const startScreenCapture = () => {
    setIsLive(true);
    setIsScreenCapturing(true);
    socket.current.emit('stream'); // You need to emit the 'stream' event without additional data
  };

  const stopScreenCapture = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationYes = () => {
    setShowConfirmation(false);
    setIsScreenCapturing(false);
    socket.current.emit('stopStream');
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <h1>Live Streaming</h1>
      {isLive ? (
        <div>
          <div>Recording Time: {recordingTime} seconds</div>
          <button onClick={stopScreenCapture}>Stop Live</button>
        </div>
      ) : (
        <div>
          <button onClick={startScreenCapture}>Start Live</button>
        </div>
      )}
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to stop the live stream?"
          onYes={handleConfirmationYes}
          onNo={handleConfirmationNo}
        />
      )}
      <ErrorIndicator /> {/* New component for displaying errors */}
    </div>
  );
};

export default Streaming;
