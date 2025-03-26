import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonGrid, IonRow, IonCol, IonFooter 
} from '@ionic/react';
import { 
  selectPeers, selectIsConnectedToRoom, useHMSStore, 
  useHMSActions, selectScreenShareByPeerID 
} from "@100mslive/react-sdk";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Peer from "./Peer";
import Footer from "./Footer";
import './Conference.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserIdContext } from "../../shared/services/global/global";
import useApi from "../../shared/services/api/api";


interface PeerType {
  id: string;
  name: string;
  videoTrack: string;
  audioTrack: string;
  isLocal: boolean;
  roleName: string;
}

function Conference() {
  const { apiReq } = useApi();
  const peers = useHMSStore(selectPeers) as PeerType[];
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const { IdUsuario } = useContext(UserIdContext);
  const history = useHistory();
  const [user, setUser] = useState<any>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [localRoleName, setLocalRoleName] = useState<string | null>(null);

  useEffect(() => {
    const userDataIni = async () => {
      const response = await apiReq('GET', `user/dataIni?IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        setUser(response.data.data);
        setProfileImage(response.data.data.Avatar);
        console.log(`#########Estos son los datos del user: ${response.data.data.Avatar}`)
      }
    };
    userDataIni();
  }, [IdUsuario, apiReq]);

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

  const mutePeer = async (peerId: string) => {
    try {
      const audioTrack = peers.find(peer => peer.id === peerId)?.audioTrack;
      const peerName = peers.find(peer => peer.id === peerId)?.name || "Usuario";
  
      if (audioTrack) {
        await hmsActions.setRemoteTrackEnabled(audioTrack, false);
        toast.info(`${peerName} ha sido silenciado`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error("Error al silenciar al peer:", err);
      toast.error("No se pudo silenciar al usuario", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };
  

  const screenShareStates = useHMSStore(state =>
    Object.fromEntries(peers.map(peer => [peer.id, selectScreenShareByPeerID(peer.id)(state)]))
  );

  const screenSharingPeer = peers.find(peer => screenShareStates[peer.id]) || null;

  const getPeerColSize = () => {
    if (peers.length === 1) return "12";
    if (peers.length <= 3) return "6";
    if (peers.length <= 6) return "4";
    if (peers.length <= 9) return "3";
    return "2";
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
    <>
      <ToastContainer /> {/* 🔹 Asegura que el toast pueda mostrarse */}
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
                  <Peer peer={screenSharingPeer} isScreenShare={true} onMutePeer={mutePeer} localRoleName={localRoleName}/>
                </IonCol>
                <IonCol size="3" className="peers-col">
                  {peers.filter(peer => peer.id !== screenSharingPeer.id).map(peer => (
                    <IonRow key={peer.id}>
                      <IonCol size="12" className='peer-col'>
                        <Peer peer={peer} isScreenSharing={true} onMutePeer={mutePeer} localRoleName={localRoleName} avatar={profileImage}/>
                      </IonCol>
                    </IonRow>
                  ))}
                </IonCol>
              </IonRow>
            ) : (
              <IonRow className='peer-row'>
                {peers.map(peer => (
                  <IonCol key={peer.id} size={peerColSize} className='peer-col'>
                    <Peer peer={peer} onMutePeer={mutePeer} localRoleName={localRoleName} avatar={profileImage}/>
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
    </>
  );
  
}

export default Conference;
