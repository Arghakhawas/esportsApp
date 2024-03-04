// Frontend - VideoStream Component
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoStream = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const startScreenSharing = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const sendStream = () => {
            if (videoRef.current) {
              context.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height
              );
              const imageDataUrl = canvas.toDataURL("image/jpeg");
              socket.current.emit("videoStream", imageDataUrl);
            }
            requestAnimationFrame(sendStream);
          };
          sendStream();
        }
      } catch (error) {
        console.error("Error starting screen sharing:", error);
      }
    };

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    socket.current = io("https://esportsappbackend.onrender.com/api/livestreaming", {
      withCredentials: true,
    });

    if (!isMobile) {
      startScreenSharing();
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      // Stop screen sharing when the component unmounts
      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isMobile]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="220px" height="480px" />
    </div>
  );
};

export default VideoStream;
