import { useEffect, useState } from "react";
import io from "socket.io-client";

const VideoReceiver = () => {
  const [videoData, setVideoData] = useState(null);
  let socket;

  useEffect(() => {
    // Connect to the socket.io server
    socket = io("http://localhost:10000");

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
  }, []);

  return (
    <div>
      {videoData && (
        <>
          <img
            src={`${videoData}`}
            alt="Base64 Image"
            width="640px"
            height="480px"
          />
        </>
      )}
    </div>
  );
};

export default VideoReceiver;
