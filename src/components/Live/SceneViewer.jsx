// SceneViewer.jsx

import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

const SceneViewer = () => {
  const [peer, setPeer] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    const initPeer = async () => {
      const peer = new Peer(undefined, { host: "/", path: "/peerjs" });

      peer.on("open", (id) => {
        console.log("Peer ID:", id);
        setPeer(peer);

        // Listen for stream events
        socket.current.on("stream", (remoteStream) => {
          setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
        });

        // Listen for stopStream event
        socket.current.on("stopStream", () => {
          setRemoteStreams([]);
        });
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
      socket.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Scene Viewer</h2>
      {remoteStreams.map((stream, index) => (
        <video key={index} ref={(ref) => (ref.srcObject = stream)} autoPlay playsInline />
      ))}
    </div>
  );
};

export default SceneViewer;
