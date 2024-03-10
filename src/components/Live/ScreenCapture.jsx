// SceneCapture.jsx

import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

const SceneCapture = () => {
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    const initPeer = async () => {
      const peer = new Peer(undefined, { host: "/", path: "/peerjs" });

      peer.on("open", (id) => {
        console.log("Peer ID:", id);
        setPeer(peer);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((userStream) => {
            setStream(userStream);

            // Emit the stream to others
            socket.current.emit("stream", userStream);

            // Listen for stopStream event
            socket.current.on("stopStream", () => {
              setStream(null);
            });
          })
          .catch((error) => console.error("Error accessing user media:", error));
      });

      peer.on("error", (err) => {
        console.error("Peer error:", err);
      });
    };

    // Connect to the Socket.io server
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

  return (
    <div>
      <h2>Scene Capture</h2>
      {stream && <video ref={(ref) => (ref.srcObject = stream)} autoPlay playsInline />}
    </div>
  );
};

export default SceneCapture;