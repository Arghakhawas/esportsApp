import { useEffect, useRef } from "react";
import io from "socket.io-client";

const VideoStream = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:10000');

    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;

        // Send the video stream to the server with a delay of 20 seconds
        const sendStreamWithDelay = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          // Draw the video frame onto the canvas
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );

          // Convert the canvas content to base64 data URL
          const imageDataUrl = canvas.toDataURL("image/jpeg");

          // Send the base64 data to the server
          socket.emit("videoStream", imageDataUrl);

          setTimeout(sendStreamWithDelay, 40); // 20 seconds delay
        };

        sendStreamWithDelay();
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

      return cleanupSocketAndStream;
    }, []);
  
    const cleanupSocketAndStream = () => {
      if (socket.current) {
        socket.current.disconnect();
      }
  
      // Stop the webcam stream
      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  
    return (
      <div>
        <video ref={videoRef} autoPlay playsInline width="640px" height="480px" />
      </div>
    );
  };
  
  export default VideoStream;