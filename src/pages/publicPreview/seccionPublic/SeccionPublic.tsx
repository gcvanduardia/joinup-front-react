import React, { useEffect, useState, useContext } from 'react';
import { IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonSplitPane } from '@ionic/react';
import TopToolBarPublic from '../components/topToolBarPublic/TopToolBarPublic';
import SideBarMenuPublic from '../components/sideBarMenuPublic/SideBarMenuPublic';
import styles from './SeccionPublic.module.css';
import CourseCard from "../../../shared/components/course-card/CourseCard";
import { UserIdContext } from "../../../shared/services/global/global";
import useApi from "../../../shared/services/api/api";
import { useParams } from 'react-router';

const SeccionPublic: React.FC = () => {
  const { IdUsuario } = useContext(UserIdContext);
  const { apiReq } = useApi();
  const [seccionCourses, setSeccionCourses] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const [nombreCategoria, setNombreCategoria] = useState<string>('');

  useEffect(() => {
    const getSeccionCourses = async () => {
      const response = await apiReq('GET', `cursos/getCursosPaginatedByCategoriaPublic?pageSize=12&pageNumber=1&CategoriaId=${id}`);
      if (response?.status === 200) {
        console.log('Seccion Cursos******: ', response.data.data);
        console.log('Seccion Cursos******: ', response.data.nombreCategoria);
        setSeccionCourses(response.data.data);
        setNombreCategoria(response.data.nombreCategoria);
      }
    }
    getSeccionCourses();
  }, [id]);

  return (
    <IonPage>
      <TopToolBarPublic />
      <IonSplitPane contentId="main">
        <SideBarMenuPublic />
        <IonContent id="main" fullscreen>
          <IonGrid className={styles.grid}>
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonTitle className={styles['ion-row-public']}>{nombreCategoria}</IonTitle>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              {seccionCourses.map((course) => (
                <IonCol size-xs="12" size-sm="6" size-md="6" size-lg="6" key={course.CursoId}>
                  <CourseCard 
                    title={course.Nombre} 
                    description={`${course.NombreProfesor} ${course.ApellidoProfesor}`} 
                    courseId={course.CursoId} 
                    Imagen={course.Imagen} 
                    Page='curso' 
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default SeccionPublic;