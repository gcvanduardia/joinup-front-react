import { useState, useEffect, useContext } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useApi from "../../shared/services/api/api";
import { UserIdContext } from "../../shared/services/global/global";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonText, IonCheckbox, IonLabel, IonItem, IonButton, IonGrid, IonRow, IonCol, IonCard, IonIcon, IonAlert } from '@ionic/react';
import { micOffOutline, micOutline, videocamOffOutline, videocamOutline } from 'ionicons/icons';
import styles from './JoinRoom.module.css';

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
  const [isCursoUsuario, setIsCursoUsuario] = useState<boolean>(true);
  const [rolUser, setRolUser] = useState<number>(0);
  const [roomCode, setRoomCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const userDataIni = async () => {
      const response = await apiReq('GET', `user/dataIni?IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        setUser(response.data.data);
        console.log(`Estos son los datos del user: ${JSON.stringify(response.data.data)}`);
        if (response.data.data.Rol === 'Instructor') {
          setRolUser(1);
          console.log(response.data.data.Rol);
        } else if (response.data.data.Rol === 'Estudiante') {
          setRolUser(2);
        }
      }
    };
    userDataIni();
  }, [IdUsuario, apiReq]);

  useEffect(() => {
    const checkCursoUsuario = async () => {
      const response = await apiReq('GET', `cursos/checkCursoUsuario?IdCurso=${id}&IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        setIsCursoUsuario(response.data.exists);
        if (!response.data.exists) {
          history.push('/home'); // Redirige al home si no es un curso de usuario
        }
      }
    };
    checkCursoUsuario();
  }, [id, IdUsuario, apiReq, history]);

  useEffect(() => {
    const detailSesion = async () => {
      try {
        console.log(id);
        const response = await apiReq('GET', `cursos/getCursoEnVivo?CursoId=${id}&Rol=${rolUser}`);
        if (response?.status === 200 && response.data.data) {
          setDataSesion(response.data.data);
          console.log(`Datos de la sesión: ${JSON.stringify(response.data.data)}`);
          if (rolUser === 1) {
            setRoomCode(response.data.data.RoomCodeHost);
          } else if (rolUser === 2) {
            setRoomCode(response.data.data.RoomCodeGuest);
          }
        } else {
          throw new Error('No se encontró un registro válido');
        }
      } catch (error) {
        console.error(error);
        history.push('/home'); // Redirige al home si no se encuentra un registro
      }
    };
    if (rolUser !== 0) {
      detailSesion();
    }
  }, [id, apiReq, rolUser, history]);

  useEffect(() => {
    if (user.Nombres && roomCode && preferencesSet) {
      const joinRoom = async () => {
        const userName = user.Nombres;

        console.log(`Fetching auth token for room code: ${roomCode}`);
        try {
          const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
          console.log(`Auth token received: ${authToken}`);

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
          setErrorMessage("Esta clase no está activa.");
        }
      };

      joinRoom();
    }
  }, [user, roomCode, preferencesSet, isAudioMuted, isVideoMuted, hmsActions, history]);

  const handleJoinClick = () => {
    setPreferencesSet(true);
  };

  const handleAlertDismiss = () => {
    setErrorMessage(null);
    history.push('/home');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid fixed className={styles.fondo}>
          <IonRow>
            <IonCol size="12" className={styles.container}>
              <IonCard className={styles['card-container']}>
                <IonRow className={styles['center-content']}>
                  <IonLabel className={styles.titulo}>Join Room</IonLabel>
                </IonRow>
                <IonRow className={styles['center-content']}>
                  <img src="img/logoPrincipal.png" alt="logo2" className={styles['logo-form']} />
                </IonRow>
                <IonRow className={styles['center-content']}>
                  <IonLabel className={styles['subTitulo']}>UNIRSE A LA SALA</IonLabel>
                </IonRow>
                <IonRow className={styles['center-content']}>
                  {!preferencesSet ? (
                    <>
                      <IonText>Seleccione sus preferencias antes de unirse:</IonText>
                      <IonItem className={styles['icon-container']} onClick={() => setIsAudioMuted(!isAudioMuted)}>
                        <IonIcon icon={isAudioMuted ? micOffOutline : micOutline} />
                        <IonCheckbox className={styles['checkbox-hidden']} checked={isAudioMuted} onIonChange={e => setIsAudioMuted(e.detail.checked)} />
                      </IonItem>
                      <IonItem className={styles['icon-container']} onClick={() => setIsVideoMuted(!isVideoMuted)}>
                        <IonIcon icon={isVideoMuted ? videocamOffOutline : videocamOutline} />
                        <IonCheckbox className={styles['checkbox-hidden']} checked={isVideoMuted} onIonChange={e => setIsVideoMuted(e.detail.checked)} />
                      </IonItem>
                      <IonButton expand="full" onClick={handleJoinClick}>Join Room</IonButton>
                    </>
                  ) : (
                    <>
                      <IonText>Conectándose...</IonText>
                      <IonSpinner name="crescent" />
                    </>
                  )}
                </IonRow>
                {errorMessage && (
                  <IonAlert
                    isOpen={!!errorMessage}
                    onDidDismiss={handleAlertDismiss}
                    header={'Error'}
                    message={errorMessage}
                    buttons={['OK']}
                  />
                )}
                <IonRow>
                  <IonLabel className={styles['texto-condiciones']}>Al unirse acepta las Condiciones de Servicio y Politica de Privacidad de MiPlataforma</IonLabel>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default JoinRoom;