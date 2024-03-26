import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LiveSceneViewer.css'; // Import CSS for styling

const LiveSceneViewer = ({ remoteStreams }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    if (remoteStreams) {
      videoRefs.current = remoteStreams.map(() => React.createRef());
    }

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
    <div className="live-scene-container">
      <h2>Live Scene Viewer</h2>
      <div className="video-grid">
        {remoteStreams && remoteStreams.length > 0 ? (
          remoteStreams.map((stream, index) => (
            <div key={index} className="video-wrapper">
              <video ref={videoRefs.current[index]} autoPlay playsInline className="responsive-video" />
            </div>
          ))
        ) : (
          <p>No live streams available</p>
        )}
      </div>
    </div>
  );
};

LiveSceneViewer.propTypes = {
  remoteStreams: PropTypes.array.isRequired,
};

export default LiveSceneViewer;
