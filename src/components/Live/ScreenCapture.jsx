import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

const SceneCapture = () => {
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const socket = useRef(null);
  useEffect(() => {
    // Function to initialize Peer
    const initPeer = async () => {
      const peer = new Peer(undefined, { host: '/', path: '/peerjs' });

      peer.on('open', (id) => {
        console.log('Peer ID:', id);
        setPeer(peer);

        // Get user media and emit stream to the server
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((userStream) => {
            setStream(userStream);
            socket.current.emit('mobile-stream', userStream);
          })
          .catch((error) => console.error('Error accessing user media:', error));
      });

      peer.on('error', (err) => console.error('Peer error:', err));
    };
    // Connect to Socket.io server
    socket.current = io('https://esportsappbackend.onrender.com');

    // Initialize Peer
    initPeer();

    // Cleanup
    return () => {
      if (peer) peer.destroy();
      if (stream) stream.getTracks().forEach((track) => track.stop





  const handleStopStream = () => {
    // Emit event to stop the stream
    socket.current.emit("stopStream");
  };

  return (
    <div>
      <h2>Scene Capture</h2>
      {stream && <video ref={(ref) => (ref.srcObject = stream)} autoPlay playsInline />}
      <button onClick={handleStopStream}>Stop Stream</button>
    </div>
  );
};

export default SceneCapture;
