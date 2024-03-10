// LiveSceneViewer.jsx

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const LiveSceneViewer = ({ remoteStreams }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    console.log("remoteStreams in useEffect 1:", remoteStreams);
    videoRefs.current = remoteStreams.map(() => React.createRef());
  
    return () => {
      // Cleanup
      videoRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.srcObject = null;
        }
      });
    };
  }, [remoteStreams]);
  
  useEffect(() => {
    console.log("remoteStreams in useEffect 2:", remoteStreams);
    remoteStreams.forEach((stream, index) => {
      if (videoRefs.current[index].current) {
        videoRefs.current[index].current.srcObject = stream;
      }
    });
  }, [remoteStreams]);
  

  return (
    <div>
      <h2>Live Scene Viewer</h2>
      {remoteStreams && remoteStreams.length > 0 ? (
        remoteStreams.map((stream, index) => (
          <video key={index} ref={videoRefs.current[index]} autoPlay playsInline />
        ))
      ) : (
        <p>No live streams available</p>
      )}
    </div>
  );
};

// Add prop-types validation
LiveSceneViewer.propTypes = {
  remoteStreams: PropTypes.array.isRequired,
};

export default LiveSceneViewer;
