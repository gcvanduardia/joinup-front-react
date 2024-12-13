import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import { selectPeers, selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Peer from "./Peer";
import Footer from "./Footer";
import './Conference.css';

interface PeerType {
  id: string;
  name: string;
  videoTrack: string;
  isLocal: boolean;
}

function Conference() {
  const peers = useHMSStore(selectPeers) as PeerType[];
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const history = useHistory();

  useEffect(() => {
    if (!isConnected) {
      history.push('/home');
    }
  }, [isConnected, history]);

  useEffect(() => {
    console.log(`Peers updated: ${JSON.stringify(peers)}`);
    const localPeer = peers.find(peer => peer.isLocal);
    if (localPeer) {
      console.log(`Local peer created: ${JSON.stringify(localPeer)}`);
      console.log(`Local peer videoTrack: ${localPeer.videoTrack}`);
    } else {
      console.log("Local peer not found.");
    }
  }, [peers]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Conference</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="peers-container">
          {peers.map((peer) => (
            <IonItem key={peer.id}>
              <Peer peer={peer} />
            </IonItem>
          ))}
        </IonList>
        <Footer />
      </IonContent>
    </IonPage>
  );
}

export default Conference;