import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonPage, IonCol, IonRow, IonItem, IonSearchbar, IonImg, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { useParams } from 'react-router-dom';
import styles from './Busqueda.module.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useHistory } from 'react-router-dom';
import { SearchbarChangeEventDetail } from '@ionic/core';
import useApi from "../../shared/services/api/api";
import CourseCard from '../../shared/components/course-card/CourseCard';

interface Course {
  CursoId: number;
  Descripcion: string;
  Imagen: string;
  Nombre: string;
  Profesor: string;
}

const Busqueda: React.FC = () => {
  const { searchQuery: initialSearchQuery } = useParams<{ searchQuery: string }>();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const { apiReq } = useApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
  const [pageNumber, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  useEffect(() => {
    if (initialSearchQuery) {
      listadoCursos(initialSearchQuery);
    }

    const setResponsivePageSize = () => {
      if (window.innerWidth < 768) {
        setPageSize(4);
      } else if (window.innerWidth < 992) {
        setPageSize(6);
      } else {
        setPageSize(12);
      }
    }
  
    // Set initial page size
    setResponsivePageSize();
  
    // Listen for window resize events
    window.addEventListener('resize', setResponsivePageSize);
  
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', setResponsivePageSize);
  }, []);

  const listadoCursos = async (terminoBusqueda: string, page: number = 1) => {
    if (terminoBusqueda.trim() !== '') {
      console.log('page: ', page);
      const url = `cursos/getListadoCursos?terminoBusqueda=${terminoBusqueda}&pageNumber=${page}&pageSize=${pageSize}`;
      console.log('url: ', url);
      const response = await apiReq('GET', url);
      if (response?.status === 200) {
        if (response.data.data.length > 0) {
          console.log('response.data.data: ', response.data.data);
          if (page === 1) {
            setCourses(response.data.data);
          } else {
            setCourses([...courses, ...response.data.data]);
          }
          if (response.data.data.length === pageSize) {
            setPage(page + 1);
          } else {
            setDisableInfiniteScroll(true);
          }
        } else {
          if (page === 1) {
            setCourses([]);
          }
          setDisableInfiniteScroll(true);
        }
      }
    } else {
      setCourses([]);
      setPage(1);
      setDisableInfiniteScroll(false);
    }
  }

  const searchNext = async ($event: CustomEvent<void>) => {
    await listadoCursos(searchQuery, pageNumber);
    console.log('*****finaliza busqueda de cursos');
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent id="main">
        <div className={styles['custom-card-title']}>
          <h2 style={{ textAlign: 'center' }}>Búsqueda</h2>
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e: CustomEvent<SearchbarChangeEventDetail>) => {
              const nextValue = e.detail.value || '';
              setSearchQuery(nextValue);
              listadoCursos(nextValue);
            }}
            onKeyPress={(e: React.KeyboardEvent) => {
              const target = e.currentTarget as HTMLInputElement;
              if (e.key === 'Enter' && target.value.trim() !== '') {
                setPage(1);
                setDisableInfiniteScroll(false);
                listadoCursos(target.value.trim());
              }
            }}
          />
        </div>
        <div className={styles['custom-card']}>
          {courses.length === 0 ? (
            <IonItem>Curso no encontrado</IonItem>
          ) : (
            <IonGrid>
              <IonRow>
                {courses.map((course: Course, index: number) => (
                  <IonCol size="12" size-md="6" size-lg="4" key={course.CursoId} >
                    <CourseCard
                      title={course.Nombre}
                      description={course.Descripcion}
                      courseId={course.CursoId}
                      Imagen={course.Imagen}
                      ProgresoCurso={0}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}
        </div>
        <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll} onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingText="Loading more good doggos...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Busqueda;