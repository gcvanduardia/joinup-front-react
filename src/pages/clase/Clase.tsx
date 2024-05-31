import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonImg, IonListHeader, IonSegment, IonSegmentButton, IonLabel, IonInput, IonList, IonItem, IonTitle, IonCardContent, IonCardHeader, IonCardTitle, IonButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import VideoPlayerHls from '../../shared/components/video-player-hls/VideoPlayerHls';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import useApi from '../../shared/services/api/api';
import './Clase.css';

const Clase: React.FC = () => {

  interface InterfaceComentario {
    Comentario: string;
    FechaCreacion: string;
    IdComentario: number;
    IdSesion: number;
    IdUsuario: number;
    NombreCompletoUsuario: string;
  }

  interface InterfaceRecurso {
    IdRecurso: number;
    IdSesion: number;
    TipoRecurso: string;
    Descripcion: string;
    URL: string;
    FechaCreacion: string;
    FechaModificacion: string;
  }

  interface InterfaceClase {
    Duracion: number;
    IdCurso: number;
    IdSesion: number;
    Imagen: string;
    Nombre: string;
    Orden: number;
    Seccion: string;
  }
  const { idCurso } = useParams<{ idCurso: string }>();
  const { idClase } = useParams<{ idClase: string }>();
  const [view, setView] = useState('clases');
  const { apiReq } = useApi();
  const history = useHistory();
  const [curso, setCurso] = useState<any>({});
  const [sesion, setSesion] = useState<any>([]);
  const [comentarios, setComentarios] = useState<any>([])
  const [recursos, setRecursos] = useState<any>([])
  const [clases, setClases] = useState<any>([]);

  useEffect(() => {
    const cursoDetail = async () => {
      const response = await apiReq('GET', `cursos/getCursoDetail?cursoId=${idCurso}`);
      if (response?.status === 200) {
        setCurso(response.data.data);
      }
    }
    cursoDetail();

    const sesionDetail = async () => {
      const response = await apiReq('GET', `cursos/getDetalleSesion?IdSesion=${idClase}`);
      if (response?.status === 200) {
        setSesion(response.data.data);
      }
    }
    sesionDetail();

    const comentario = async () => {
      const response = await apiReq('GET', `cursos/getComentariosSesion?IdSesion=${idClase}`);
      if (response?.status === 200) {
        setComentarios(response.data.data);
      }
    }
    comentario();

    const fetchClases = async () => {
      const response = await apiReq('GET', `cursos/getListadoSesiones?IdCurso=${idCurso}`);
      if (response?.status === 200) {
        setClases(response.data.data);
      }
    }
    fetchClases();

    const fetchRecursos = async () => {
      const response = await apiReq('GET', `cursos/getRecursosSesion?IdSesion=${idClase}`);
      if (response?.status === 200) {
        setRecursos(response.data.data);
      }
    }
    fetchRecursos()
  }, []);

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent fullscreen id='main'>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle className='title'>{curso.NombreCurso}</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow className='custom-row'>
            <IonCol sizeLg='8' sizeMd='12' sizeSm='12' sizeXs='12' className="video-col">
              <div className='video-container'>
                <VideoPlayerHls curso="robotica-test" video="curso-robotica-1.m3u8" />
              </div>
              <div className='resource-list-container'>
                <h2>Recursos</h2>
                <IonList className='resources-list'>
                  {recursos.map((recurso: InterfaceRecurso, index: number) => (
                    <IonItem key={index} lines="full" className="resource-item">
                      <IonLabel className="resource-label">
                        <div className="resource-info">
                          <h2 className="resource-title">{recurso.Descripcion}</h2>
                          <IonButton fill="outline" href={recurso.URL} target="_blank">Ver recurso</IonButton>
                        </div>
                        <p className="resource-type">{recurso.TipoRecurso}</p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </div>
            </IonCol>
            <IonCol sizeLg='4' sizeMd='12' sizeSm='12' sizeXs='12' className="segment-col">
              <IonCard><IonTitle className='title'>{sesion.Nombre}</IonTitle></IonCard>
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
                    <IonList>
                      {Object.entries(clases.reduce((r: any, a: InterfaceClase) => {
                        r[a.Seccion] = [...r[a.Seccion] || [], a];
                        return r;
                      }, {}))
                        .sort(([aKey, aVal], [bKey, bVal]) => {
                          const aClases = aVal as InterfaceClase[];
                          const bClases = bVal as InterfaceClase[];
                          const aOrden = aClases[0]?.Orden || 0;
                          const bOrden = bClases[0]?.Orden || 0;
                          return aOrden - bOrden;
                        })
                        .map(([seccion, clasesEnSeccion], index) => (
                          <div key={index}>
                            <IonListHeader className='title-seccion'>{seccion}</IonListHeader>
                            {(clasesEnSeccion as InterfaceClase[])
                              .sort((a, b) => a.Orden - b.Orden)
                              .map((sesion, index) => (
                                <IonItem button onClick={() => history.push(`/curso/${idCurso}/${sesion.IdSesion}`)} key={index}>
                                  <IonImg style={{ height: '60px' }} src={sesion.Imagen}></IonImg>
                                  <IonLabel>{sesion.Nombre}</IonLabel>
                                  <IonLabel>
                                    {Math.floor(sesion.Duracion * 60)} minutos
                                    {Math.round((sesion.Duracion * 60 - Math.floor(sesion.Duracion * 60)) * 60) !== 0 &&
                                      `${Math.round((sesion.Duracion * 60 - Math.floor(sesion.Duracion * 60)) * 60)} segundos`}
                                  </IonLabel>
                                </IonItem>
                              ))}
                          </div>
                        ))}
                    </IonList>
                  </div>
                )}
                {view === 'comentarios' && (
                  <div>
                    {comentarios.map((comentario: InterfaceComentario, index: number) => (
                      <IonCard key={index}>
                        <IonCardHeader>
                          <IonCardTitle className="user-name">{comentario.NombreCompletoUsuario}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="comment-text">
                          {comentario.Comentario}
                        </IonCardContent>
                      </IonCard>
                    ))}
                    <IonInput placeholder="Escribe un comentario"></IonInput>
                  </div>
                )}
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className='resources-container'>
              <h2>Recursos</h2>
              <IonList className='resources-list'>
                {recursos.map((recurso: InterfaceRecurso, index: number) => (
                  <IonItem key={index} lines="full" className="resource-item">
                    <IonLabel className="resource-label">
                      <div className="resource-info">
                        <h2 className="resource-title">{recurso.Descripcion}</h2>
                        <IonButton fill="outline" href={recurso.URL} target="_blank">Ver recurso</IonButton>
                      </div>
                      <p className="resource-type">{recurso.TipoRecurso}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
            <IonCol size="4">

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default Clase;