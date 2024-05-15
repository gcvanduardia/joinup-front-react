import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonSegment, IonSegmentButton, IonLabel, IonInput, IonList, IonItem, IonTitle, IonCardContent, IonCardHeader, IonCardTitle, IonButton } from '@ionic/react';
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
  const [sesion, setSesion] = useState<any>([]);
  const [comentarios, setComentarios] = useState<any>([])
  const [recursos, setRecursos] = useState<any>([])
  const [clases, setClases] = useState<any>([]);

  useEffect(() => {
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
              </IonRow>
            </IonCol>
            <IonCol size="4">
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
                      {clases.map((clase:InterfaceClase, index:number) => (
                        <IonCard onClick={() => history.push(`/curso/${idCurso}/${clase.IdSesion}`)} className='class-buttons' key={index}>
                          <IonItem lines='none'>{clase.Nombre}</IonItem>
                        </IonCard>
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
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default Clase;