import { useVideo } from "@100mslive/react-sdk";
import React from "react";

interface PeerProps {
  peer: {
    id: string;
    name: string;
    videoTrack: string;
    isLocal: boolean;
  };
}

const Peer: React.FC<PeerProps> = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });

  console.log(`Rendering peer: ${peer.name}, isLocal: ${peer.isLocal}, videoTrack: ${peer.videoTrack}`);

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted={peer.isLocal} // Mute local peer to avoid echo
        playsInline
      />
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
};

export default Peer;