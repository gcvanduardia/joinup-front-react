import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { useVideo, useHMSStore, selectScreenShareByPeerID } from "@100mslive/react-sdk";
import { micOffOutline } from 'ionicons/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

interface PeerProps {
  peer: {
    id: string;
    name: string;
    videoTrack: string;
    isLocal: boolean;
  };
  isScreenShare?: boolean;
  isScreenSharing?: boolean;
  onMutePeer: (peerId: string) => void;
  localRoleName: string | null; // Se recibe el rol del usuario
}

const Peer: React.FC<PeerProps> = ({ peer, isScreenShare = false, isScreenSharing = false, onMutePeer, localRoleName }) => {
  const { videoRef } = useVideo({ trackId: peer.videoTrack });
  const screenShareTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef: screenShareRef } = useVideo({ trackId: screenShareTrack?.id });

  return (
    <IonCard className={`peer-container ${isScreenShare ? "screen-share-container" : ""} ${isScreenSharing ? "auto-height" : ""}`}>
      <IonCardHeader style={{ position: "relative" }}>
        <IonCardTitle>{peer.name} {peer.isLocal ? "(You)" : ""}</IonCardTitle>

        {!peer.isLocal && (localRoleName === "host" || localRoleName === "instructor") && (
          <button className="mute-button" onClick={() => onMutePeer(peer.id)}>
            <IonIcon icon={micOffOutline} />
          </button>

        )}
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
