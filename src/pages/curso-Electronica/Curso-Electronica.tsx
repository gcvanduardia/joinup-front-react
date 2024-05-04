import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonSegment, IonSegmentButton, IonLabel, IonInput, IonList, IonItem, IonTitle   } from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayerHls from '../../shared/components/video-player-hls/VideoPlayerHls';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import './Curso-Electronica.css';

const CursoElectronica: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [view, setView] = useState('clases');
  let title;

  switch (id) {
      case '1':
        title = 'Clase 1';
        break;
      case '2':
        title = 'Clase 2'
        break;
      case '3':
        title = 'Clase 3'
        break;
      default:
        title = 'Clase 1';
  }
    return (
      <IonPage>
        <MenuToolbar/>
        <IonContent fullscreen id='main'>
          <IonGrid>
            <IonRow>
              <IonCol size="8">
                <div className='video-container'>
                  <VideoPlayerHls curso="robotica-test" video="curso-robotica-1.m3u8"/>
                </div>
              </IonCol>
              <IonCol size="4">
                <IonCard><IonTitle className='title'>{title}</IonTitle></IonCard>
                <IonCard>
                  <IonSegment value={view} onIonChange={e => {
                      if (typeof e.detail.value === 'string') {
                        setView(e.detail.value);
                      }
                    }}>
                      <IonSegmentButton value="clases">
                          <IonLabel>Clases</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton value="comentarios">
                          <IonLabel>Comentarios</IonLabel>
                      </IonSegmentButton>
                  </IonSegment>
                  {view === 'clases' && (
                    <div>
                      <IonTitle className='curse-title'>Curso de Electronica</IonTitle>
                      <IonList>
                        <IonCard onClick={() => {window.location.href='/curso-electronica/1'}} className='class-buttons'>
                          <IonItem lines='none'>Clase 1</IonItem>
                        </IonCard>
                        <IonCard onClick={() => {window.location.href='/curso-electronica/2'}} className='class-buttons'>
                          <IonItem lines='none'>Clase 2</IonItem>
                        </IonCard>
                        <IonCard onClick={() => {window.location.href='/curso-electronica/3'}} className='class-buttons'>
                          <IonItem lines='none'>Clase 3</IonItem>
                        </IonCard>
                      </IonList>
                    </div>
                  )}
                  {view === 'comentarios' && (
                    <div>
                      <IonLabel>Comentarios</IonLabel>
                      <IonInput placeholder="Escribe un comentario"></IonInput>
                    </div>
                  )}
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
};

export default CursoElectronica;