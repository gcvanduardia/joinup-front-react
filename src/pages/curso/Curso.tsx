import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonText, IonCard, IonButton } from '@ionic/react';
import './Curso.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useParams } from 'react-router-dom'; 
import { useHistory } from 'react-router-dom';

const Curso: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  let description;
  let route = window.location.pathname;
  let imageSrc = '../../../public/img/imagenPresentacion.png';

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
                <IonCard><IonText>{description}</IonText></IonCard>
                <IonButton className='course-button' onClick={() => window.location.href = route}>Ingresar al curso</IonButton>
              </IonCol>
            </IonRow>
        </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Curso;