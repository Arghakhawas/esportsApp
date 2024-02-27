import { useEffect, useRef } from "react";
import io from "socket.io-client";

const VideoStream = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    const socket = useRef(io('https://esportsappbackend.onrender.com/api/livestreaming'));


    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
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
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

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

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="640px" height="480px" className="responsive-video" />
    </div>
  );
};

export default VideoStream;
