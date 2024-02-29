import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const LiveViewer = () => {
  const [videoData, setVideoData] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('https://esportsappbackend.onrender.com');
    setSocket(socketInstance);

    socketInstance.on('videoStream', (dataUrl) => {
      setVideoData(dataUrl);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Live Screen</h1>
      <img src={`${videoData}`} alt="Base64 Image" />

    </div>
  );
};

export default LiveViewer;
