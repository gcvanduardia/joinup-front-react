import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonLabel, IonNote, IonItem, IonSearchbar } from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Busqueda.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useHistory } from 'react-router-dom';
import { SearchbarChangeEventDetail } from '@ionic/core';
import useApi from "../../shared/services/api/api";

interface Curso {
  ApellidoProfesor: string;
  CursoId: number;
  Imagen: string;
  Nombre: string;
  NombreProfesor: string;
}

const Busqueda: React.FC = () => {
  const { searchQuery: initialSearchQuery } = useParams<{ searchQuery: string }>();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const { apiReq } = useApi();
  const [courses, setCourses] = useState<Curso[]>([]);

  useEffect(() => {
    listadoCursos(initialSearchQuery);
  }, []);

  const listadoCursos = async (terminoBusqueda: string) => {
    if (terminoBusqueda) {
      const response = await apiReq('GET', `cursos/getListadoCursos?terminoBusqueda=${terminoBusqueda}`);
      if (response?.status === 200 ) {
        setCourses(response.data.data);
        console.log('cursos: ', response.data.data);
      }
    }
  }

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent id = "main">
        <div className="custom-card-title">
          <h2 style={{textAlign: 'center'}}>Búsqueda</h2>
          <IonSearchbar 
            value={searchQuery}
            onIonChange={(e: CustomEvent<SearchbarChangeEventDetail>) => setSearchQuery(e.detail.value || '')}
            onKeyPress={(e: React.KeyboardEvent) => {
              const target = e.currentTarget as HTMLInputElement;
              if (e.key === 'Enter' && target.value.trim() !== '') {
                listadoCursos(target.value.trim());
              }
            }}
          />
        </div>
        <div className="custom-card">
          {courses.length === 0 ? (
            <IonItem>Curso no encontrado</IonItem>
          ) : (
            courses.map((course: Curso, index: number) => (
              <IonItem button key={course.CursoId} onClick={() => {history.push(`/curso/${course.CursoId}`)}}>
                <IonLabel>{course.Nombre}</IonLabel>
                <IonNote slot="end" className="professor-name">{course.NombreProfesor} {course.ApellidoProfesor}</IonNote>
              </IonItem>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Busqueda;