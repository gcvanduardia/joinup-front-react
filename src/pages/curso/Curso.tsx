import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonText, IonCard, IonButton, IonItem, IonList, IonTitle } from '@ionic/react';
import './Curso.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Curso: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  let imageSrc = 'public/img/imagenPresentacion.png';
  const history = useHistory();

  return (
    <IonPage>
      <MenuToolbar/>
      <IonContent fullscreen id = "main">
        <div className="curso-container">
          <IonGrid>
            <IonRow>
              <IonCol size='12' sizeMd="8">
                <IonImg src={imageSrc} alt={id} />
              </IonCol>
              <IonCol className='description-container'>
                <IonCard><IonLabel className='title'>Curso {id}</IonLabel></IonCard>
                <IonCard><IonText>Descripcion del Curso {id}</IonText></IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div className='curso-title'>
                  <IonTitle>Clases</IonTitle>
                </div>
                <div className='curso-list'>
                  <IonList>
                    <IonItem button onClick={() => history.push(`/curso/${id}/1`)}>
                      <IonLabel>Clase 1</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push(`/curso/${id}/2`)}>
                      <IonLabel>Clase 2</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push(`/curso/${id}/3`)}>
                      <IonLabel>Clase 3</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push(`/curso/${id}/4`)}>
                      <IonLabel>Clase 4</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => history.push(`/curso/${id}/5`)}>
                      <IonLabel>Clase 5</IonLabel>
                    </IonItem>
                  </IonList>
                </div>
              </IonCol>
            </IonRow>
        </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Curso;