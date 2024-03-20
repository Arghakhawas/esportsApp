import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import LiveSceneViewer from "./LiveSceneViewer";

const SceneViewer = () => {
  const [remoteStreams, setRemoteStreams] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    // Connect to the Socket.io server
    socket.current = io("https://esportsappbackend.onrender.com");

    // Listen for stream events
    socket.current.on("stream", (remoteStream) => {
      setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
    });

    // Listen for stopStream event
    socket.current.on("stopStream", () => {
      setRemoteStreams([]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Scene Viewer</h2>
      {remoteStreams.length > 0 ? (
        <LiveSceneViewer remoteStreams={remoteStreams} />
      ) : (
        <p>No live streams available</p>
      )}
    </div>
  );
};

export default SceneViewer;
