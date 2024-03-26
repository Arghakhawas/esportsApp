import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LiveSceneViewer = ({ remoteStreams }) => {
  // Ref for video elements
  const videoRefs = useRef([]);

  useEffect(() => {
    // Update video references when remoteStreams change
    if (remoteStreams) {
      videoRefs.current = remoteStreams.map(() => React.createRef());
    }

    // Cleanup
    return () => {
      videoRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.srcObject = null;
        }
      });
    };
  }, [remoteStreams]);

  useEffect(() => {
    
    if (remoteStreams) {
      remoteStreams.forEach((stream, index) => {
        if (videoRefs.current[index].current) {
          videoRefs.current[index].current.srcObject = stream;
        }
      });
    }
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

// Prop types validation
LiveSceneViewer.propTypes = {
  remoteStreams: PropTypes.array.isRequired,
};

// Export the component
export default LiveSceneViewer;
