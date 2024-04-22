import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonListHeader, IonLabel, IonButton } from '@ionic/react';
import './Home.css';
import  VideoPlayerHls from "../../shared/components/video-player-hls/VideoPlayerHls";
import { setJwt } from '../../shared/services/api/api';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {

  const history = useHistory();

  const logOut = () => {
    setJwt("");
    localStorage.removeItem('joinup-session');
    /* history.push('/login'); */
    window.location.reload();
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Viodeo test</IonTitle>
          <IonButton slot="end" onClick={logOut}>Logout</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size='12' sizeMd="8">
              <VideoPlayerHls curso="robotica-test" video="curso-robotica-1.m3u8"/>
            </IonCol>
            <IonCol>
              <IonList>
                <IonListHeader>
                  <IonLabel><strong>Contenido del curso:</strong></IonLabel>
                </IonListHeader>
                <IonItem>Capítulo 1: Introducción</IonItem>
                <IonItem>Capítulo 2: Conceptos básicos</IonItem>
                <IonItem>Capítulo 3: Avanzado</IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;