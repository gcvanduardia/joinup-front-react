import React, { useEffect, useState } from 'react';
import { IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonSplitPane, IonToolbar, IonButtons, IonButton, IonImg, IonSearchbar, IonChip, IonLabel, IonIcon, IonList, IonItem, IonMenu } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { search } from 'ionicons/icons';
import styles from './HomePublic.module.css';
import CourseCard from "../../../shared/components/course-card/CourseCard";
import useApi from "../../../shared/services/api/api";
import logo from '../../../../public/icons/logoPrincipal 1.png';
import { useWindowSize } from 'react-use';
import SideBarMenuPublic from '../components/sideBarMenuPublic/SideBarMenuPublic';
import TopToolBarPublic from '../components/topToolBarPublic/TopToolBarPublic';

const HomePublic: React.FC = () => {
  const { apiReq } = useApi();
  const [recomendedCourses, setRecomendedCourses] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowSize();
  const location = useLocation();
  const [courses, setCourses] = useState<any[]>([]);
  const whatsappNumber = "573207105607"; // Reemplaza con el número de WhatsApp

  useEffect(() => {
    const getRecomendedCourses = async () => {
      const response = await apiReq('GET', `cursos/getCursosPaginatedPublic?pageSize=12&pageNumber=1`);
      if (response?.status === 200) {
        console.log('Cursos recomendados: ', response.data.data);
        setRecomendedCourses(response.data.data);
      }
    }
    getRecomendedCourses();
  }, []);

  const handleSearch = async (e: CustomEvent) => {
    const nextValue = e.detail.value!;
    setSearchQuery(nextValue);

    if (nextValue.trim() !== '') {
      const response = await apiReq('GET', `cursos/getListadoCursosToolBar?terminoBusqueda=${nextValue}`);
      if (response?.status === 200) {
        const firstFiveCourses = response.data.data;
        setCourses(firstFiveCourses);
        setShowSearchResults(true);
      }
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <IonPage>
      <TopToolBarPublic />
      <IonSplitPane contentId="main">
        <SideBarMenuPublic />
        <IonContent id="main" fullscreen>
          <IonGrid className={styles.grid}>
            <IonRow className={styles['ion-row-recomendados']}>
              <IonCol>
                <IonTitle>Cursos Recomendados</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow>
              {recomendedCourses.map((course) => (
                <IonCol size-xs="12" size-sm="6" size-md="6" size-lg="6" key={course.CursoId}>
                  <CourseCard title={course.Nombre} description={`${course.NombreProfesor} ${course.ApellidoProfesor}`} courseId={course.CursoId} Imagen={course.Imagen} Page='curso-preview'/>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          {/* Botón flotante de WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hola%20quiero%20más%20información`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className={styles.whatsappIcon}
            />
          </a>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default HomePublic;