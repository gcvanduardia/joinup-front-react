import React, { useContext, useState, useEffect } from 'react';
import { IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import './Home.css';
import CourseCard from "../../shared/components/course-card/CourseCard";
import { UserContext } from '../../shared/services/global/global';
import { apiReq } from '../../shared/services/api/api';

const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  console.log('User from home: ', user);
  const [historialCursos, setHistorialCursos] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await apiReq('POST', 'user/historialCursos', { IdUsuario: user.IdUsuario });
        console.log('historial de cursos: ',response?.data.data);
        setHistorialCursos(response?.data.data || []);
      };

      fetchData();
    }
  }, [user]);

  const courses = [
    { title: "Curso 1", description: "Descripción del Curso 1", id: 1 },
    { title: "Curso 2", description: "Descripción del Curso 2", id: 2 },
    { title: "Curso 3", description: "Descripción del Curso 3", id: 3 },
    { title: "Curso 4", description: "Descripción del Curso 4", id: 4 },
    { title: "Curso 5", description: "Descripción del Curso 5", id: 5 },
    { title: "Curso 6", description: "Descripción del Curso 6", id: 6 },
  ];
  const RecomendedCourses = [
    { title: "Curso 11", description: "Descripción del Curso 1", id: 11 },
    { title: "Curso 22", description: "Descripción del Curso 2", id: 22 },
    { title: "Curso 33", description: "Descripción del Curso 3", id: 33 },
    { title: "Curso 54", description: "Descripción del Curso 4", id: 54 },
    { title: "Curso 55", description: "Descripción del Curso 5", id: 55 },
    { title: "Curso 66", description: "Descripción del Curso 6", id: 66 },
  ];

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
            {historialCursos.map((course:any) => (
              <IonCol size="4" key={course.IdSesion}>
                <CourseCard title={course.NombreCurso} description={course.NombreSesion} courseId={course.IdCurso} />
              </IonCol>
            ))}
          </IonRow>
          <IonRow className='ion-row-recomendados'>
            <IonCol>
              <IonTitle>Cursos Recomendados</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            {RecomendedCourses.map((course) => (
              <IonCol size="4" key={course.id}>
                <CourseCard title={course.title} description={course.description} courseId={course.id} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;