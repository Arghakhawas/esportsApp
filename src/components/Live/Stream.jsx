// Frontend - VideoStream Component
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoStream = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const peerConnection = useRef(null);

  useEffect(() => {
    const startWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Set up the RTCPeerConnection
        peerConnection.current = new RTCPeerConnection();

        // Add the local stream to the peer connection
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        // Set up signaling events
        socket.current.on("offer", (offer, senderSocketId) => {
          handleOffer(offer, senderSocketId);
        });

        socket.current.on("answer", (answer) => {
          handleAnswer(answer);
        });

        socket.current.on("ice-candidate", (candidate) => {
          handleIceCandidate(candidate);
        });

        // Create an offer and send it to the server
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.current.emit("offer", offer);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    // Function to handle incoming offer
    const handleOffer = async (offer, senderSocketId) => {
      // Set remote description
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      // Create an answer
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      // Send the answer back to the offerer
      socket.current.emit("answer", answer, senderSocketId);
    };

    // Function to handle incoming answer
    const handleAnswer = async (answer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    };

    // Function to handle incoming ICE candidate
    const handleIceCandidate = (candidate) => {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    // Check if the device is a mobile device
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    // Initialize Socket.IO connection
    const socket = useRef(io('https://esportsappbackend.onrender.com/api/livestreaming', { withCredentials: true }));


    // Start WebRTC streaming if not a mobile device
    if (!isMobile) {
      startWebRTC();
    }

    return () => {
      // Clean up and disconnect Socket.IO
      if (socket.current) {
        socket.current.disconnect();
      }

      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isMobile]);

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        const sendStreamWithDelay = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const imageDataUrl = canvas.toDataURL("image/jpeg");

          socket.current.emit("videoStream", imageDataUrl);

          setTimeout(sendStreamWithDelay, 40);
        };

        sendStreamWithDelay();
      }
    } catch (error) {
      console.error("Error starting screen sharing:", error);
    }
  };

  return (
    <div>
      {isMobile ? (
        <button onClick={startScreenSharing}>Start Screen Sharing</button>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline width="640px" height="480px" className="responsive-video" />
        </>
      )}
    </div>
  );
};

export default VideoStream;
