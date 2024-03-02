import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ConfirmationDialog from './ConfirmationDialog';

const Streaming = () => {
  const socket = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const [isLive, setIsLive] = useState(false);
  const [isScreenCapturing, setIsScreenCapturing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    socket.current = io('https://esportsappbackend.onrender.com/api/livestreaming');

    socket.current.on('connect_error', () => {
      console.error('Socket connection error');
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
  }, []);

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

  const handleStartStopButtonClick = () => {
    if (isLive) {
      setShowConfirmation(true);
    } else {
      startScreenCapture();
    }
  };

  const startScreenCapture = () => {
    setIsLive(true);
    setIsScreenCapturing(true);
    socket.current.emit('stream');
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
          <button onClick={handleStartStopButtonClick}>Stop Live</button>
        </div>
      ) : (
        <div>
          <button onClick={handleStartStopButtonClick}>Start Live</button>
        </div>
      )}
      <video ref={videoRef} autoPlay playsInline width="100px" height="480" />
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to stop the live stream?"
          onYes={handleConfirmationYes}
          onNo={handleConfirmationNo}
        />
      )}
    </div>
  );
};

export default Streaming;
