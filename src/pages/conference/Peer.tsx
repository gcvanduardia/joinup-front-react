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
}

const Peer: React.FC<PeerProps> = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });

  const screenShareTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef: screenShareRef } = useVideo({
    trackId: screenShareTrack?.id
  });

  console.log(`Rendering peer: ${peer.name}, isLocal: ${peer.isLocal}, videoTrack: ${peer.videoTrack}`);

  return (
    <IonCard className="peer-container">
      <IonCardHeader>
        <IonCardTitle>{peer.name} {peer.isLocal ? "(You)" : ""}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <video
          ref={videoRef}
          className={`peer-video ${peer.isLocal ? "local" : ""}`}
          autoPlay
          muted={peer.isLocal}
          playsInline
        />
        {screenShareTrack && (
          <video
            ref={screenShareRef}
            className="screen-share-video"
            autoPlay
            playsInline
          />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Peer;