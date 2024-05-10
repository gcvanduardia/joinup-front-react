import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonSegment, IonSegmentButton, IonLabel, IonInput, IonList, IonItem, IonTitle, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import VideoPlayerHls from '../../shared/components/video-player-hls/VideoPlayerHls';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import './Clase.css';

const Clase: React.FC = () => {
  const { idCurso } = useParams<{ idCurso: string }>();
  const { idClase } = useParams<{ idClase: string }>();
  const [view, setView] = useState('clases');
  const history = useHistory();
  console.log('Componente CursoElectronica renderizado');

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent fullscreen id='main'>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle className='title'>Curso {idCurso}</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8">
              <IonRow>
                <div className='video-container'>
                  <VideoPlayerHls curso="robotica-test" video="curso-robotica-1.m3u8" />
                </div>
              </IonRow>
              <IonRow>
                <div className='resources-container'>
                  <h2>Recursos</h2>
                  <IonList className='resources-list'>
                    <IonItem button>Recurso 1</IonItem>
                    <IonItem button>Recurso 2</IonItem>
                    <IonItem button>Recurso 3</IonItem>
                    <IonItem button>Recurso 4</IonItem>
                    <IonItem button>Recurso 5</IonItem>
                  </IonList>
                </div>
              </IonRow>
            </IonCol>
            <IonCol size="4">
              <IonCard><IonTitle className='title'>Clase {idClase}</IonTitle></IonCard>
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
                      <IonCard onClick={() => history.push(`/curso/${idCurso}/1`)} className='class-buttons'>
                        <IonItem lines='none'>Clase 1</IonItem>
                      </IonCard>
                      <IonCard onClick={() => history.push(`/curso/${idCurso}/2`)} className='class-buttons'>
                        <IonItem lines='none'>Clase 2</IonItem>
                      </IonCard>
                      <IonCard onClick={() => history.push(`/curso/${idCurso}/3`)} className='class-buttons'>
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

export default Clase;