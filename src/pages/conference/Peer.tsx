import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { useVideo, useHMSStore, selectScreenShareByPeerID, selectTrackByID } from "@100mslive/react-sdk";
import { micOutline, micOffOutline } from 'ionicons/icons';
import React, { useState, useEffect } from "react";

interface PeerProps {
  peer: {
    id: string;
    name: string;
    videoTrack: string;
    audioTrack: string;
    isLocal: boolean;
  };
  isScreenShare?: boolean;
  isScreenSharing?: boolean;
  onMutePeer: (peerId: string) => void;
  localRoleName: string | null;
  avatar?: string | null;
}

const Peer: React.FC<PeerProps> = ({ peer, isScreenShare = false, isScreenSharing = false, onMutePeer, localRoleName, avatar }) => {
  const { videoRef } = useVideo({ trackId: peer.videoTrack });
  const screenShareTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef: screenShareRef } = useVideo({ trackId: screenShareTrack?.id });

  const videoTrack = useHMSStore(selectTrackByID(peer.videoTrack));
  const audioTrack = useHMSStore(selectTrackByID(peer.audioTrack));
  const [isMuted, setIsMuted] = useState(audioTrack ? !audioTrack.enabled : true);

  useEffect(() => {
    if (audioTrack) {
      setIsMuted(!audioTrack.enabled);
    }
  }, [audioTrack?.enabled]);

  return (
    <IonCard className={`peer-container ${isScreenShare ? "screen-share-container" : ""} ${isScreenSharing ? "auto-height" : ""}`}>
      <IonCardHeader style={{ position: "relative" }}>
        <IonCardTitle>{peer.name} {peer.isLocal ? "(Tú)" : ""}</IonCardTitle>

        {/* Botón de mute SOLO visible para hosts/instructores */}
        {!peer.isLocal && (localRoleName === "host" || localRoleName === "instructor") && (
          <button 
            className={`mute-button ${isMuted ? "muted" : "unmuted"}`} 
            onClick={() => onMutePeer(peer.id)}
          >
            <IonIcon icon={isMuted ? micOffOutline : micOutline} className="mute-icon" />
          </button>
        )}

      </IonCardHeader>

      <IonCardContent>
        {screenShareTrack ? (
          <>
            <video ref={screenShareRef} className="screen-share-video" autoPlay playsInline controls />
            <video ref={videoRef} className="mini-video" autoPlay muted={peer.isLocal} playsInline />
          </>
        ) : videoTrack?.enabled ? (
          <video ref={videoRef} className={`peer-video ${peer.isLocal ? "local" : ""}`} autoPlay muted={peer.isLocal} playsInline />
        ) : (
          <img 
            src={avatar || "default-avatar.png"} // Usa la prop `avatar` directamente
            alt="Usuario con cámara desactivada"
            className="peer-placeholder"
          />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Peer;
