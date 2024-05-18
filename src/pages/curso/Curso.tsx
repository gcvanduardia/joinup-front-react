import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonText, IonCard, IonButton, IonItem, IonList, IonTitle } from '@ionic/react';
import './Curso.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from "../../shared/services/api/api";

interface Sesion {
  Duracion: number;
  IdCurso: number;
  IdSesion: number;
  Imagen: string;
  Nombre: string;
  Orden: number;
  Seccion: string;
}

const Curso: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { apiReq } = useApi();
  const [curso, setCurso] = useState<any>({});
  const [sesiones, setSesiones] = useState<any>([]);

  useEffect(() => {
    const cursoDetail = async () => {
      const response = await apiReq('GET', `cursos/getCursoDetail?cursoId=${id}`);
      if (response?.status === 200) {
        console.log('curso: ', response.data.data);
        setCurso(response.data.data);
      }
    }
    cursoDetail();

    const listadoSesiones = async () => {
      const response = await apiReq('GET', `cursos/getListadoSesiones?IdCurso=${id}`);
      if (response?.status === 200) {
        console.log('sesiones: ', response.data.data);
        setSesiones(response.data.data);
      }
    }
    listadoSesiones();
  }, []);

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent fullscreen id="main">
        <div className="curso-container">
          <IonGrid>
            <IonRow>
              <IonCol size='8' sizeXs='12' sizeSm="12" sizeLg='8' >
                <IonImg src={curso.Imagen} alt={id}  className='image-container'/>
              </IonCol>
              <IonCol size='4' sizeXs='12' sizeSm='12' sizeLg='4' className='description-container'>
                <IonCard><IonLabel className='title'>{curso.NombreCurso}</IonLabel></IonCard>
                <IonCard><IonText>{curso.DescripcionPrincipal}</IonText></IonCard>
                <IonCard><IonText>{curso.NombreCompletoProfesor}</IonText></IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div className='curso-title'>
                  <IonTitle>Clases</IonTitle>
                </div>
                <div className='curso-list'>
                  <IonList>
                    {sesiones.map((sesion: Sesion, index: number) => (
                      <IonItem button onClick={() => history.push(`/curso/${id}/${sesion.IdSesion}`)} key={index}>
                        <IonImg style={{ height: '60px' }} src={sesion.Imagen}></IonImg>
                        <IonLabel>{sesion.Nombre}</IonLabel>
                        <IonLabel>
                          {Math.floor(sesion.Duracion * 60)} minutos
                          {Math.round((sesion.Duracion * 60 - Math.floor(sesion.Duracion * 60)) * 60) !== 0 &&
                            `${Math.round((sesion.Duracion * 60 - Math.floor(sesion.Duracion * 60)) * 60)} segundos`}
                        </IonLabel>
                      </IonItem>
                    ))}
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