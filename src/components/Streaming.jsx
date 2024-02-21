import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { ScreenCapture } from 'react-screen-capture';

import io from 'socket.io-client';

const Streaming = ({   }) => {
    const webcamRef = useRef(null);
  const socket = useRef(null);
 

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

  const startLiveStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Assign the stream to the webcam
        webcamRef.current.srcObject = stream;
        socket.current.emit('stream', stream);
        setIsLive(true);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  const stopLiveStream = () => {
    // Stop the stream
    const stream = webcamRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    // Clear the srcObject to stop the webcam video
    webcamRef.current.srcObject = null;
    socket.current.emit('stream', stream);
    setIsLive(false);
  };

  const captureScreen = () => {
    // Implement logic to capture the screen using MediaDevices API
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((screenStream) => {
        // You can handle the screen stream as needed
        console.log('Screen captured:', screenStream);
        // Send the screen stream to the server for broadcasting
        socket.current.emit('stream', screenStream);
      })
      .catch((error) => {
        console.error('Error capturing screen:', error);
      });
  };

  return (
    <div>
      <h1>Live Streaming</h1>
      {isLive ? (
        <div>
          <Webcam ref={webcamRef} />
          <button onClick={stopLiveStream}>Stop Live</button>
        </div>
      ) : (
        <div>
          <button onClick={startLiveStream}>Start Live</button>
        </div>
      )}
      <ScreenCapture
        onEndCapture={captureScreen}
        onStartCapture={captureScreen}
        captureScreen={true}
        videoConstraints={{
          width: 1920,
          height: 1080,
          facingMode: 'user',
        }}
      />
    </div>
  );
};

export default Streaming;
