import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import LiveSceneViewer from "./LiveSceneViewer";

  const SceneViewer = () => {
    const [remoteStreams, setRemoteStreams] = useState([]);
  
    useEffect(() => {
      // Connect to the Socket.io server
      const socket = io("https://esportsappbackend.onrender.com");
  
      // Listen for stream events
      socket.on("mobile-stream", (stream) => {
        setRemoteStreams((prevStreams) => [...prevStreams, stream]);
      });
  
      // Listen for stopStream event
      socket.on("stopStream", () => {
        setRemoteStreams([]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <div>
        <h2>Scene Viewer</h2>
        {remoteStreams.length > 0 ? (
          remoteStreams.map((stream, index) => (
            <video key={index} srcObject={stream} autoPlay playsInline />
          ))
        ) : (
          <p>No live streams available</p>
        )}
      </div>
    );
  };

export default SceneViewer;
