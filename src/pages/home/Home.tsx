import React, { useEffect, useState, useContext } from 'react';
import { IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import './Home.css';
import CourseCard from "../../shared/components/course-card/CourseCard";
import { UserIdContext } from "../../shared/services/global/global";
import useApi from "../../shared/services/api/api";

const Home: React.FC = () => {
  const { IdUsuario } = useContext(UserIdContext);
  const { apiReq } = useApi();
  const [historialCursos, setHistorialCursos] = useState<any[]>([]);
  const [recomendedCourses, setRecomendedCourses] = useState<any[]>([]);

  useEffect(() => {
    console.log('IdUsuario from Home: ', IdUsuario);
    const getHistorialCursos = async () => {
      const response = await apiReq('GET', `user/historialCursos?IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        console.log('Historial de cursos: ', response.data.data);
        setHistorialCursos(response.data.data);
      }
    }
    getHistorialCursos();

    const getRecomendedCourses = async () => {
      const response = await apiReq('GET', `cursos/getCursosPaginated?pageSize=12&pageNumber=1`);
      if (response?.status === 200) {
        console.log('Cursos recomendados: ', response.data.data);
        setRecomendedCourses(response.data.data);
      }
    }
    getRecomendedCourses();

  }, [IdUsuario]);

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
            {historialCursos.map((course) => (
              <IonCol size-xs="12" size-sm="6" size-md="4" size-lg="3" key={course.IdCurso}>
                <CourseCard title={course.NombreCurso} description={course.NombreSesion} courseId={course.IdCurso} Imagen={course.ImagenCurso} ProgresoCurso={course.ProgresoCurso} />
              </IonCol>
            ))}
          </IonRow>
          <IonRow className='ion-row-recomendados'>
            <IonCol>
              <IonTitle>Cursos Recomendados</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            {recomendedCourses.map((course) => (
              <IonCol size-xs="12" size-sm="6" size-md="4" size-lg="3" key={course.CursoId}>
                <CourseCard title={course.Nombre} description={course.NombreProfesor+' '+course.ApellidoProfesor} courseId={course.CursoId} Imagen={course.Imagen} ProgresoCurso={0} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;