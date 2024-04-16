import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonListHeader, IonLabel } from '@ionic/react';
import './Home.css';
import  VideoPlayerHls from "../../shared/components/video-player-hls/VideoPlayerHls";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Viodeo test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <VideoPlayerHls curso="robotica-test" video="curso-robotica-1.m3u8"/>
            </IonCol>
            <IonCol size="4">
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
