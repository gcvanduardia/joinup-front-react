import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonText, IonCard, IonButton } from '@ionic/react';
import './Curso.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useParams } from 'react-router-dom'; 
import { useHistory } from 'react-router-dom';

const Curso: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  let title;
  let description;
  let route = window.location.pathname;
  let imageSrc = '../../../public/img/imagenPresentacion.png';
  switch (id) {
    case '1':
      title = 'Curso 1';
      description = 'Descripción del Curso 1';
      route = '/curso-electronica/1';
      break;
    case '2':
      title = 'Curso 2';
      description = 'Descripción del Curso 2';
      break;
    case '3':
      title = 'Curso 3';
      description = 'Descripción del Curso 3';
      break;
    default:
      title = 'Curso no encontrado';
      description = '';
  }

  return (
    <IonPage>
      <MenuToolbar/>
      <IonContent fullscreen id = "main">
        <div className="curso-container">
          <IonGrid>
            <IonRow>
              <IonCol size='12' sizeMd="8">
                <IonImg src={imageSrc} alt={title} />
              </IonCol>
              <IonCol className='description-container'>
                <IonCard><IonLabel className='title'>{title}</IonLabel></IonCard>
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