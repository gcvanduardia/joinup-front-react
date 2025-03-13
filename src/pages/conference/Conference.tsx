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

  // ✅ Llamar useHMSStore fuera de map()
  const screenShareStates = useHMSStore(state =>
    Object.fromEntries(peers.map(peer => [peer.id, selectScreenShareByPeerID(peer.id)(state)]))
  );

  const screenSharingPeer = peers.find(peer => screenShareStates[peer.id]) || null;

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
        <IonGrid className='conference-container'>
          {screenSharingPeer ? (
            <IonRow className='screen-sharing-layout'>
              <IonCol size="8" className="screen-share-col">
                <Peer peer={screenSharingPeer} isScreenShare={true} />
              </IonCol>
              <IonCol size="4" className="peers-col">
                {peers.filter(peer => peer.id !== screenSharingPeer.id).map(peer => (
                  <IonRow key={peer.id}>
                    <IonCol size="12" className='peer-col'>
                      <Peer peer={peer} />
                    </IonCol>
                  </IonRow>
                ))}
              </IonCol>
            </IonRow>
          ) : (
            <IonRow className='peer-row'>
              {peers.map(peer => (
                <IonCol key={peer.id} size='4' className='peer-col'>
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
