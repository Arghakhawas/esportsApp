  import React, { useEffect, useRef, useState } from "react";
  import io from "socket.io-client";

  const VideoReceiver = () => {
    const [videoData, setVideoData] = useState(null);
    const socket = useRef(null);

    useEffect(() => {
      socket.current = io('https://esportsappbackend.onrender.com/api/livestreaming', {
        withCredentials: true,
      });

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
        {videoData && (
          <img src={`${videoData}`} alt="Base64 Image" width="220px" height="480px" className="responsive-video" />
        )}
      </div>
    );
  };

  export default VideoReceiver;
