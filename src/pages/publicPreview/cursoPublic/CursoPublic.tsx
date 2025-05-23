import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLabel, IonListHeader, IonImg, IonText, IonCard, IonItem, IonList, IonTitle, IonSplitPane, IonButton } from '@ionic/react';
import SideBarMenuPublic from '../components/sideBarMenuPublic/SideBarMenuPublic';
import TopToolBarPublic from '../components/topToolBarPublic/TopToolBarPublic';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import useApi from "../../../shared/services/api/api";
import styles from './CursoPublic.module.css';

interface Sesion {
  Duracion: number;
  IdCurso: number;
  IdSesion: number;
  Imagen: string;
  Nombre: string;
  Orden: number;
  Seccion: string;
}

const CursoPublic: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { apiReq } = useApi();
  const [curso, setCurso] = useState<any>({});


  useEffect(() => {
    const cursoDetail = async () => {
      const response = await apiReq('GET', `cursos/getCursoDetailPublic?cursoId=${id}`);
      if (response?.status === 200) {
        setCurso(response.data.data);
      }
    }
    cursoDetail();
  }, [id]);

  const handleButtonClick = (url: string) => {
    history.push(url); // Redirige a la URL proporcionada
  };

  return (
    <IonPage>
      <TopToolBarPublic/>
      <IonSplitPane contentId="main">
        <SideBarMenuPublic/>
        <IonContent fullscreen id="main">
          <IonGrid className={styles["curso-container"]}>
            <IonRow>
              <IonCol size='8' sizeXs='12' sizeSm="12" sizeLg='8' >
                  <IonImg src={curso.Imagen} alt={id}/>
              </IonCol>
              <IonCol size='4' sizeXs='12' sizeSm='12' sizeLg='4' className={styles['description-container']}>
                <IonCard className={styles['title-container']}>
                  <IonTitle className={styles['title']}>
                      {curso.NombreCurso?.includes("Grupo") ? (
                        <>
                          {curso.NombreCurso.split("Grupo")[0]}<br />
                          Grupo{curso.NombreCurso.split("Grupo")[1]}
                        </>
                      ) : (
                        curso.NombreCurso
                      )}
                  </IonTitle>
                </IonCard>
                <IonCard><IonText>{curso.DescripcionPrincipal}</IonText></IonCard>
                <IonCard className={styles['name-container']}><IonText>{curso.NombreCompletoProfesor}</IonText></IonCard>
                <IonButton className={styles['btn']} onClick={() => handleButtonClick(`/login/${id}`)}>¡Comienza tu aventura!</IonButton>
                <IonButton className={styles['btn']} onClick={() => handleButtonClick(`/curso-info/${id}`)}>Más Información</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default CursoPublic;