import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useVideo, useHMSStore, selectScreenShareByPeerID } from "@100mslive/react-sdk";
import React from "react";

interface PeerProps {
  peer: {
    id: string;
    name: string;
    videoTrack: string;
    isLocal: boolean;
  };
  isScreenShare?: boolean;
  isScreenSharing?: boolean; // Nueva prop
}

const Peer: React.FC<PeerProps> = ({ peer, isScreenShare = false, isScreenSharing = false }) => {
  const { videoRef } = useVideo({ trackId: peer.videoTrack });
  const screenShareTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef: screenShareRef } = useVideo({ trackId: screenShareTrack?.id });

  return (
    <IonCard className={`peer-container ${isScreenShare ? "screen-share-container" : ""} ${isScreenSharing ? "auto-height" : ""}`}>
      <IonCardHeader>
        <IonCardTitle>{peer.name} {peer.isLocal ? "(You)" : ""}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {screenShareTrack ? (
          <>
            <video ref={screenShareRef} className="screen-share-video" autoPlay playsInline controls />
            <video ref={videoRef} className="mini-video" autoPlay muted={peer.isLocal} playsInline />
          </>
        ) : (
          <video ref={videoRef} className={`peer-video ${peer.isLocal ? "local" : ""}`} autoPlay muted={peer.isLocal} playsInline />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Peer;