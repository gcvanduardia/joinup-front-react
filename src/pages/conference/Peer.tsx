import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useVideo, useHMSStore, selectScreenShareByPeerID } from "@100mslive/react-sdk";
import React, { useState, useEffect } from "react";

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

  const [screenShareError, setScreenShareError] = useState<string | null>(null);

  useEffect(() => {
    if (!screenShareTrack) {
      setScreenShareError(null); // No mostrar error si no hay track de pantalla compartida
    } else {
      setScreenShareError(null);
    }
  }, [screenShareTrack]);

  const handleScreenShareError = (error: any) => {
    if (!error.message.includes("User denied permission to access capture device")) {
      setScreenShareError(error.message);
    }
  };

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
            controls
            style={{ display: 'block', position: 'relative', zIndex: 1 }}
            onLoadedMetadata={(e) => {
              const videoElement = e.target as HTMLVideoElement;
              videoElement.controls = true;
            }}
            onError={(e) => handleScreenShareError(e)}
          />
        )}
        {screenShareError && (
          <div className="error-message">
            {screenShareError}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Peer;