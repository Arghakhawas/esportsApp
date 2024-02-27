// Client-Side: Live Viewer
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const LiveViewer = () => {
  const [videoData, setVideoData] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://your-server-address");

    socket.current.on("videoStream", (dataUrl) => {
      setVideoData(dataUrl);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Live Screen</h1>
      {videoData && <img src={`${videoData}`} alt="Base64 Image" />}
    </div>
  );
};

export default LiveViewer;