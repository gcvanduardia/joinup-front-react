import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonLabel, IonListHeader, IonImg, IonText, IonCard, IonItem, IonList, IonTitle, IonSplitPane, IonButton } from '@ionic/react';
import SideBarMenu from '../../shared/components/sideBarMenu/SideBarMenu';
import TopToolBar from '../../shared/components/topToolBar/TopToolBar';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserIdContext } from "../../shared/services/global/global";
import useApi from "../../shared/services/api/api";
import styles from './Curso.module.css';

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
  const { IdUsuario } = useContext(UserIdContext);
  const [isCursoUsuario, setIsCursoUsuario] = useState<boolean>(true);

  useEffect(() => {
    const checkCursoUsuario = async () => {
      const response = await apiReq('GET', `cursos/checkCursoUsuario?IdCurso=${id}&IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        setIsCursoUsuario(response.data.exists);
      }
    }
    checkCursoUsuario();
  }, [id]);

  useEffect(() => {
    const cursoDetail = async () => {
      const response = await apiReq('GET', `cursos/getCursoDetail?cursoId=${id}`);
      if (response?.status === 200) {
        setCurso(response.data.data);
      }
    }
    cursoDetail();
  }, [id]);

  useEffect(() => {
    if (isCursoUsuario && !curso.EnVivo) {
      const listadoSesiones = async () => {
        const response = await apiReq('GET', `cursos/getListadoSesiones?IdCurso=${id}`);
        if (response?.status === 200) {
          setSesiones(response.data.data);
        }
      }
      listadoSesiones();
    }
  }, [curso, id, isCursoUsuario]);

  const handleButtonClick = (url: string) => {
    history.push(url); // Redirige a la URL proporcionada
  };

  return (
    <IonPage>
      <TopToolBar />
      <IonSplitPane contentId="main">
        <SideBarMenu />
        <IonContent fullscreen id="main">
          <IonGrid className={styles["curso-container"]}>
            <IonRow>
              <IonCol size='8' sizeXs='12' sizeSm="12" sizeLg='8' >
                  <IonImg src={curso.Imagen} alt={id}/>
                  {!isCursoUsuario && (
                  <h2 className={styles['course-error']}>No tienes acceso a este curso!</h2>
                )}
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
                {curso.EnVivo && isCursoUsuario && (
                  <IonButton expand="full" className={styles['course-button']} onClick={() => history.push(`/join/${id}`)}>Conectarse</IonButton>
                )}
                {!isCursoUsuario && (
                  <div>
                    <IonButton onClick={() => handleButtonClick(`/compra/${id}`)}>¡Comienza tu aventura!</IonButton>
                    <IonButton onClick={() => handleButtonClick(`/cursoInfo/${id}`)}>Más Información</IonButton>
                  </div>
                )}
              </IonCol>
            </IonRow>
            {!curso.EnVivo && isCursoUsuario && (
              <IonRow>
                <IonCol>
                  <div className={styles['curso-title']}>
                    <IonTitle>Clases</IonTitle>
                  </div>
                  <div className={styles['curso-list']}>
                    <IonList>
                      {Object.entries(sesiones.reduce((r: any, a: Sesion) => {
                        r[a.Seccion] = [...r[a.Seccion] || [], a];
                        return r;
                      }, {}))
                      .sort(([aKey, aVal], [bKey, bVal]) => {
                        const aSesiones = aVal as Sesion[];
                        const bSesiones = bVal as Sesion[];
                        const aOrden = aSesiones[0]?.Orden || 0;
                        const bOrden = bSesiones[0]?.Orden || 0;
                        return aOrden - bOrden;
                      })
                      .map(([seccion, sesionesEnSeccion], index) => (
                        <div key={index}>
                          <IonListHeader className={styles["section-title"]}>{seccion}</IonListHeader>
                          {(sesionesEnSeccion as Sesion[])
                            .sort((a, b) => a.Orden - b.Orden)
                            .map((sesion, index) => (
                              <IonItem button onClick={() => history.push(`/curso/${id}/${sesion.IdSesion}`)} key={index}>
                                <IonImg style={{ height: '60px' }} src={sesion.Imagen}></IonImg>
                                <div className={styles["session-info"]}>
                                  <IonLabel>{sesion.Nombre}</IonLabel>
                                  <IonLabel>
                                    {Math.floor(sesion.Duracion * 60)} minutos
                                    {Math.round((sesion.Duracion * 60 - Math.floor(sesion.Duracion * 60)) * 60) !== 0 &&
                                      `${Math.round((sesion.Duracion * 60 - Math.floor(sesion.Duracion * 60)) * 60)} segundos`}
                                  </IonLabel>
                                </div>
                              </IonItem>
                          ))}
                        </div>
                      ))}
                    </IonList>
                  </div>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Curso;