import { useEffect, useState ,useRef} from "react";
import io from "socket.io-client";

const VideoReceiver = () => {
  const [videoData, setVideoData] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    const socket = useRef(io('https://esportsappbackend.onrender.com/api/livestreaming', {
      withCredentials: true,
    }));
    

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
        <img src={`${videoData}`} alt="Base64 Image" width="640px" height="480px" className="responsive-video"/>
      )}
    </div>
  );
};

export default VideoReceiver;