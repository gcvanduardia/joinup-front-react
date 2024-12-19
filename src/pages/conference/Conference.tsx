import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import { selectPeers, selectIsConnectedToRoom, useHMSStore, useHMSActions } from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
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
  const peers = useHMSStore(selectPeers) as PeerType[]; // Obtén la lista de peers
  const isConnected = useHMSStore(selectIsConnectedToRoom); // Estado de conexión
  const hmsActions = useHMSActions(); // Acciones del SDK de 100ms
  const history = useHistory();

  // Estado para saber si la grabación está activa
  const [isRecording, setIsRecording] = useState(false);

  // Efecto para redirigir al usuario si no está conectado
  useEffect(() => {
    if (!isConnected) {
      history.push('/home'); // Si no está conectado, redirige a la página de inicio
    }
  }, [isConnected, history]);

  // Efecto para manejar los cambios en los peers
  useEffect(() => {
    console.log(`Peers actualizados: ${JSON.stringify(peers)}`);
    const localPeer = peers.find(peer => peer.isLocal); // Busca el peer local
    if (localPeer) {
      console.log(`Peer local creado: ${JSON.stringify(localPeer)}`);
      console.log(`VideoTrack del peer local: ${localPeer.videoTrack}`);
    } else {
      console.log("No se encontró el peer local.");
    }
  }, [peers]);

  // Función para iniciar o detener la grabación
  const toggleRecording = async () => {

    const params = {
      record: true, // Establece en false si solo deseas transmitir sin grabar
    };

    try {
      console.log("Intentando iniciar/detener grabación...");
      if (isRecording) {
        // Detén la grabación si ya está en marcha
        await hmsActions.stopRTMPAndRecording();
        setIsRecording(false);
        console.log("Grabación detenida");
      } else {
        // Inicia la grabación si no está activa
        await hmsActions.startRTMPOrRecording(params);
        setIsRecording(true);
        console.log("Grabación iniciada");
      }
    } catch (err) {
      console.error("Error al iniciar/detener la grabación o transmisión RTMP:", err);
    }
  };

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
        <Footer onRecordingToggle={toggleRecording} isRecording={isRecording} />
      </IonContent>
    </IonPage>
  );
}

export default Conference;
