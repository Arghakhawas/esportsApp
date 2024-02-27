import React, { useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk";
import "agora-rtc-sdk-ng";

const VideoStream = () => {
  const videoRef = useRef(null);
  const agoraEngine = useRef(null);

  useEffect(() => {
    const initAgoraEngine = async () => {
      agoraEngine.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      agoraEngine.current.setClientRole("host");

      try {
        await agoraEngine.current.join("<b81631fa57a64971bad1125c459150e9>", "<esports Empries>", "<Your token>", 1);

        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        await agoraEngine.current.publish([localAudioTrack, localVideoTrack]);

        localVideoTrack.play(videoRef.current);
      } catch (error) {
        console.error("Agora RTC initialization error:", error);
      }
    };

    initAgoraEngine();

    return () => {
      if (agoraEngine.current) {
        agoraEngine.current.leave();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="100%" height="auto" className="responsive-video" />
    </div>
  );
};

export default VideoStream;
