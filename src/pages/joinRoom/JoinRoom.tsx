import { useState, useEffect, useContext } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useApi from "../../shared/services/api/api";
import { UserIdContext } from "../../shared/services/global/global";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonText, IonCheckbox, IonLabel, IonItem, IonButton } from '@ionic/react';

function JoinRoom() {
  const { apiReq } = useApi();
  const { id } = useParams<{ id: string }>();
  const hmsActions = useHMSActions();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const [dataSesion, setDataSesion] = useState<any>({});
  const { IdUsuario } = useContext(UserIdContext);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [preferencesSet, setPreferencesSet] = useState(false);

  useEffect(() => {
    const userDataIni = async () => {
      const response = await apiReq('GET', `user/dataIni?IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        setUser(response.data.data);
        console.log(`Estos son los datos del user: ${JSON.stringify(response.data.data)}`);
      }
    }
    userDataIni();
  }, [IdUsuario, apiReq]);

  useEffect(() => {
    const detailSesion = async () => {
      console.log(id);
      const response = await apiReq('GET', `cursos/getCursoEnVivo?CursoId=${id}`);
      if (response?.status === 200) {
        setDataSesion(response.data.data);
        console.log(`Datos de la sesión: ${JSON.stringify(response.data.data)}`);
      }
    }
    detailSesion();
  }, [id, apiReq]);

  useEffect(() => {
    if (user.Nombres && dataSesion.RoomCode && preferencesSet) {
      const joinRoom = async () => {
        const userName = user.Nombres;
        const roomCode = dataSesion.RoomCode;

        console.log(`Fetching auth token for room code: ${roomCode}`);
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        console.log(`Auth token received: ${authToken}`);

        try {
          await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

          await hmsActions.join({
            userName,
            authToken,
            settings: {
              isAudioMuted,
              isVideoMuted
            }
          });
          console.log(`User ${userName} has joined the room successfully.`);
          history.push("/conference");
        } catch (e) {
          console.error(`Error joining the room: ${e}`);
        }
      };

      joinRoom();
    }
  }, [user, dataSesion, preferencesSet, isAudioMuted, isVideoMuted, hmsActions, history]);

  const handleJoinClick = () => {
    setPreferencesSet(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Join Room</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!preferencesSet ? (
          <>
            <IonText>Seleccione sus preferencias antes de unirse:</IonText>
            <IonItem>
              <IonLabel>Audio Muted</IonLabel>
              <IonCheckbox checked={isAudioMuted} onIonChange={e => setIsAudioMuted(e.detail.checked)} />
            </IonItem>
            <IonItem>
              <IonLabel>Video Muted</IonLabel>
              <IonCheckbox checked={isVideoMuted} onIonChange={e => setIsVideoMuted(e.detail.checked)} />
            </IonItem>
            <IonButton expand="full" onClick={handleJoinClick}>Join Room</IonButton>
          </>
        ) : (
          <>
            <IonText>Conectándose...</IonText>
            <IonSpinner name="crescent" />
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default JoinRoom;