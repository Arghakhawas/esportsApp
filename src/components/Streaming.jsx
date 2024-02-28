  import React, { useState, useEffect, useRef } from "react";
  import io from "socket.io-client";
  import ConfirmationDialog from "./ConfirmationDialog";
  import './Streaming.css';

  const Streaming = () => {
    const socket = useRef(null);
    const videoRef = useRef(null);
    const [isLive, setIsLive] = useState(false);
    const [isScreenCapturing, setIsScreenCapturing] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);  
    const [showConfirmation, setShowConfirmation] = useState(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Detect if the device is mobile

    useEffect(() => {
      socket.current = io("https://esportsappbackend.onrender.com/api/livestreaming");

      if (isScreenCapturing && isLive) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;

              const sendStreamWithDelay = () => {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;

                context.drawImage(
                  videoRef.current,
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );

                const imageDataUrl = canvas.toDataURL("image/jpeg");

                socket.current.emit("videoStream", imageDataUrl);

                setTimeout(sendStreamWithDelay, 40);
              };

              sendStreamWithDelay();
            }
          })
          .catch((error) => {
            console.error("Error accessing webcam", error);
          });
      }

      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }, [isLive, isScreenCapturing]);

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
      startTimer();
    };

    const stopScreenCapture = () => {
      setShowConfirmation(true);
    };

    const handleConfirmationYes = () => {
      setShowConfirmation(false);
      stopTimer();
    };

    const handleConfirmationNo = () => {
      setShowConfirmation(false);
    };

    const handleStopLive = () => {
      stopScreenCapture(); 
    };

    return (
      <div>
        <h1>Live Streaming</h1>
        {isLive ? (
          <div>
            <div>Recording Time: {recordingTime} seconds</div>
            <button onClick={handleStopLive}>Stop Live</button>

          </div>
        ) : (
          <div>
            {isMobile ? (
              <button onClick={startScreenCapture}>Start Live</button> 
            ) : (
              <div>Live streaming is not available on this device.</div>
            )}
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
      </div>
    );
  };

  export default Streaming;
