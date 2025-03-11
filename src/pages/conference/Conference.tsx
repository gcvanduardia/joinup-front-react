import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonFooter } from '@ionic/react';
import { selectPeers, selectIsConnectedToRoom, useHMSStore, useHMSActions } from "@100mslive/react-sdk";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Peer from "./Peer";
import Footer from "./Footer";
import './Conference.css';
import useApi from "../../shared/services/api/api";
import { UserIdContext } from "../../shared/services/global/global";

interface PeerType {
  id: string;
  name: string;
  videoTrack: string;
  isLocal: boolean;
  roleName: string;
}

function Conference() {
  const peers = useHMSStore(selectPeers) as PeerType[]; // Obtén la lista de peers
  const isConnected = useHMSStore(selectIsConnectedToRoom); // Estado de conexión
  const hmsActions = useHMSActions(); // Acciones del SDK de 100ms
  const history = useHistory();
  const { apiReq } = useApi();
  const { IdUsuario } = useContext(UserIdContext);

  // Estado para saber si la grabación está activa
  const [isRecording, setIsRecording] = useState(false);
  const [localRoleName, setLocalRoleName] = useState<string | null>(null);

  // Efecto para redirigir al usuario si no está conectado
  useEffect(() => {
    if (!isConnected) {
      history.push('/home'); // Si no está conectado, redirige a la página de inicio
    }
  }, [isConnected, history]);

  // Efecto para manejar los cambios en los peers
  useEffect(() => {
    console.log(`Peers actualizados: ${JSON.stringify(peers)}`);
    console.log(`User Id #############: ${IdUsuario}`);
    const localPeer = peers.find(peer => peer.isLocal); // Busca el peer local
    if (localPeer) {
      console.log(`Peer local creado: ${JSON.stringify(localPeer)}`);
      console.log(`VideoTrack del peer local: ${localPeer.videoTrack}`);
      console.log(`Rol del peer local: ${localPeer.roleName}`);
      setLocalRoleName(localPeer.roleName);
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

  // Función para salir de la reunión
  const leaveConference = async () => {
    try {
      // Deshabilitar el audio y video locales
      await hmsActions.setLocalAudioEnabled(false);
      await hmsActions.setLocalVideoEnabled(false);
  
      // Obtener las pistas de medios locales y detenerlas manualmente
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStream.getTracks().forEach(track => track.stop());
  
      // Salir de la sala y cambiar estado de conexion
      const response = await userLiveTrackerEdit();
      if (response?.status === 200) {
        console.log('#################### Ahora el usuario esta desconectado', response.data);
        await hmsActions.leave();
  
        // Redirigir al usuario a la página de inicio
        history.push('/home');
  
        // Recargar la página
        window.location.reload();
      }
    } catch (err) {
      console.error("Error al salir de la reunión:", err);
    }
  };
  
  const userLiveTrackerEdit = async () => {
    const response = await apiReq('GET', `cursos/userLiveTracker?IdUsuario=${IdUsuario}&connected=false&accion=editar`);
    return response;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-custom">
          <IonTitle className="ion-title-custom">Conference</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-bottom">
        <IonGrid class='conference-container'>
          <IonRow class='peer-row'>
            {peers.map((peer) => (
              <IonCol key={peer.id} size='4' className='peer-col'>
                <Peer peer={peer} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <Footer onRecordingToggle={toggleRecording} isRecording={isRecording} onLeave={leaveConference} roleName={localRoleName} />
      </IonFooter>
    </IonPage>
  );
}

export default Conference;