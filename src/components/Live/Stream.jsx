import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoStream = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const startScreenSharing = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

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
      } catch (error) {
        console.error("Error accessing screen:", error);
        // Handle the error, display a message to the user, or retry
      }
    };

    // Check if the device is a mobile device
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }

      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartScreenSharing = () => {
    startScreenSharing();
  };

  return (
    <div>
      {isMobile && (
        <button onClick={handleStartScreenSharing}>Start Screen Sharing</button> 
      )}
      <video ref={videoRef} autoPlay playsInline width="640px" height="480px" className="responsive-video" />
    </div>
  );
};

export default VideoStream;
