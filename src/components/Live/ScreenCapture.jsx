import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

const SceneCapture = () => {
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    const initPeer = async () => {
      const newPeer = new Peer(undefined, { host: '/', path: '/peerjs' });

      newPeer.on('open', (id) => {
        console.log('Peer ID:', id);
        setPeer(newPeer);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((userStream) => {
            setStream(userStream);
            socket.current.emit('mobile-stream', userStream);
          })
          .catch((error) => console.error('Error accessing user media:', error));
      });

      newPeer.on('error', (err) => console.error('Peer error:', err));
    };

    socket.current = io("https://esportsappbackend.onrender.com");
    initPeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      socket.current.disconnect();
    };
  }, []);

  const handleStopStream = () => {
    socket.current.emit("stopStream");
  };

  return (
    <div>
      <h2>Scene Capture</h2>
      {stream ? (
        <video ref={(ref) => (ref.srcObject = stream)} autoPlay playsInline />
      ) : (
        <p>Accessing media devices...</p>
      )}
      <button onClick={handleStopStream}>Stop Stream</button>
    </div>
  );
};

export default SceneCapture;
