import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const LiveViewer = () => {
  const [videoData, setVideoData] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    const socket = useRef(io('https://esportsappbackend.onrender.com/api/livestreaming'));


    socket.current.on('videoStream', (dataUrl) => {
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
      <img src={`${videoData}`} alt="Base64 Image" />
    </div>
  );
};

export default LiveViewer;
