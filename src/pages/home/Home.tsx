import React from 'react';
import {IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import './Home.css';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <MenuToolbar />
      <IonContent fullscreen id="main">
        <IonGrid className='grid'>
          <IonRow>
            <IonCol>
              <IonTitle>Cursos en progreso</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonCard className="clickable-card" onClick={() => window.location.href = "/curso/1"}>
                <IonCardContent>
                  <h2 className="course-title">Curso 1</h2>
                  <p>Descripción del Curso 1</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="clickable-card" onClick={() => window.location.href = "/curso/2"}>
                <IonCardContent>
                  <h2 className="course-title">Curso 2</h2>
                  <p>Descripción del Curso 2</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="clickable-card" onClick={() => window.location.href = "/curso/3"}>
                <IonCardContent>
                  <h2 className="course-title">Curso 3</h2>
                  <p>Descripción del Curso 3</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonCard className="clickable-card" onClick={() => window.location.href = "/curso/4"}>
                <IonCardContent>
                  <h2 className="course-title">Curso 4</h2>
                  <p>Descripción del Curso 4</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="clickable-card" onClick={() => window.location.href = "/curso/5"}>
                <IonCardContent>
                  <h2 className="course-title">Curso 5</h2>
                  <p>Descripción del Curso 5</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="clickable-card" onClick={() => window.location.href = "/curso/6"}>
                <IonCardContent>
                  <h2 className="course-title">Curso 6</h2>
                  <p>Descripción del Curso 6</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className='ion-row-recomendados'>
            <IonCol>
              <IonTitle>Cursos Recomendados</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <h2 className="course-title">Curso 1</h2>
                  <p>Descripción del Curso 1</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <h2 className="course-title">Curso 2</h2>
                  <p>Descripción del Curso 2</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <h2 className="course-title">Curso 3</h2>
                  <p>Descripción del Curso 3</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <h2 className="course-title">Curso 4</h2>
                  <p>Descripción del Curso 4</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <h2 className="course-title">Curso 5</h2>
                  <p>Descripción del Curso 5</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <h2 className="course-title">Curso 6</h2>
                  <p>Descripción del Curso 6</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;