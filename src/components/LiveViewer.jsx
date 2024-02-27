// LiveViewer.js
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const LiveViewer = () => {
  const videoRef = useRef(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const socket = io(
      "https://esportsappbackend.onrender.com/api/livestreaming"
    );

    // Listen for incoming video streams
    socket.on("videoStream", (dataUrl) => {
      // Set the received video data
      setVideoData(dataUrl);
    });

    return () => {
      // Cleanup: Disconnect socket
      if (socket) {
        socket.disconnect();
      }
    };

    // socket.on("stream", (stream) => {
    //   if (videoRef.current) {
    //     videoRef.current.srcObject = stream;
    //   }
    // });

    // socket.on("connect_error", () => {
    //   console.error("Socket connection error");
    // });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div>
      <h1>Live Screen</h1>
      {/* <video ref={videoRef} autoPlay playsInline width="640" height="480" /> */}
      <img src={`${videoData}`} alt="Base64 Image" />
    </div>
  );
};

export default LiveViewer;
