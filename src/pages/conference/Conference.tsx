import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonFooter } from '@ionic/react';
import { selectPeers, selectIsConnectedToRoom, useHMSStore, useHMSActions, selectScreenShareByPeerID } from "@100mslive/react-sdk";
import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Peer from "./Peer";
import Footer from "./Footer";
import './Conference.css';

interface PeerType {
  id: string;
  name: string;
  videoTrack: string;
  isLocal: boolean;
  roleName: string;
}

function Conference() {
  const peers = useHMSStore(selectPeers) as PeerType[];
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const history = useHistory();

  const [isRecording, setIsRecording] = useState(false);
  const [localRoleName, setLocalRoleName] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) {
      history.push('/home');
    }
  }, [isConnected, history]);

  useEffect(() => {
    const localPeer = peers.find(peer => peer.isLocal);
    if (localPeer && localPeer.roleName !== localRoleName) {
      setLocalRoleName(localPeer.roleName);
    }
  }, [peers, localRoleName]);

  // Obtener el estado de pantalla compartida de todos los peers
  const screenShareStates = useHMSStore(state =>
    Object.fromEntries(peers.map(peer => [peer.id, selectScreenShareByPeerID(peer.id)(state)]))
  );

  // Encontrar el peer que está compartiendo pantalla
  const screenSharingPeer = peers.find(peer => screenShareStates[peer.id]) || null;

  // Ajustar tamaño de columnas según la cantidad de participantes
  const getPeerColSize = () => {
    if (peers.length === 1) return "12"; // Un solo participante → pantalla completa
    if (peers.length <= 3) return "6";   // 2-3 participantes → columnas grandes (50%)
    if (peers.length <= 6) return "4";   // 4-6 participantes → columnas medianas (33%)
    if (peers.length <= 9) return "3";   // 7-9 participantes → columnas pequeñas (25%)
    return "2";                          // 10+ participantes → columnas más pequeñas (16%-20%)
  };
  const peerColSize = getPeerColSize();

  const getPeerHeightClass = () => {
    if (peers.length === 1) return "height-1";
    if (peers.length <= 3) return "height-2-3";
    if (peers.length <= 6) return "height-4-6";
    if (peers.length <= 9) return "height-7-9";
    return "height-10-plus";
  };
  const peerHeightClass = getPeerHeightClass();

  const toggleRecording = async () => {
    try {
      if (isRecording) {
        await hmsActions.stopRTMPAndRecording();
      } else {
        await hmsActions.startRTMPOrRecording({ record: true });
      }
      setIsRecording(!isRecording);
    } catch (err) {
      console.error("Error al cambiar el estado de la grabación:", err);
    }
  };

  const leaveConference = async () => {
    try {
      await hmsActions.setLocalAudioEnabled(false);
      await hmsActions.setLocalVideoEnabled(false);
      await hmsActions.leave();
      history.push('/home');
      window.location.reload();
    } catch (err) {
      console.error("Error al salir de la reunión:", err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-custom">
          <IonTitle className="ion-title-custom">Conference</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-bottom">
        <IonGrid className={`conference-container ${screenSharingPeer ? "auto-height" : peerHeightClass}`}>
          {screenSharingPeer ? (
            <IonRow className='screen-sharing-layout'>
              <IonCol size="9" className="screen-share-col">
                <Peer peer={screenSharingPeer} isScreenShare={true} />
              </IonCol>
              <IonCol size="3" className="peers-col">
                {peers.filter(peer => peer.id !== screenSharingPeer.id).map(peer => (
                  <IonRow key={peer.id}>
                    <IonCol size="12" className='peer-col'>
                      <Peer peer={peer} isScreenSharing={true} />
                    </IonCol>
                  </IonRow>
                ))}
              </IonCol>
            </IonRow>
          ) : (
            <IonRow className='peer-row'>
              {peers.map(peer => (
                <IonCol key={peer.id} size={peerColSize} className='peer-col'>
                  <Peer peer={peer} />
                </IonCol>
              ))}
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
      <IonFooter>
        <Footer onRecordingToggle={toggleRecording} isRecording={isRecording} onLeave={leaveConference} roleName={localRoleName} />
      </IonFooter>
    </IonPage>
  );
}

export default Conference;