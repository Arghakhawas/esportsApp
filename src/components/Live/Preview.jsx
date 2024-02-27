import { useEffect, useState ,useRef} from "react";
import io from "socket.io-client";

const VideoReceiver = () => {
  const [videoData, setVideoData] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:10000');

    socket.current.on('videoStream', (dataUrl) => {
      setVideoData(dataUrl);
    });

    return cleanupSocket;
  }, []);

  const cleanupSocket = () => {
    if (socket.current) {
      socket.current.disconnect();
    }
  };

  return (
    <div>
      {videoData && (
        <img src={`${videoData}`} alt="Base64 Image" width="640px" height="480px" />
      )}
    </div>
  );
};

export default VideoReceiver;