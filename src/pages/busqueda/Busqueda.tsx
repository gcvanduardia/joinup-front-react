import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonSearchbar } from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Busqueda.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useHistory } from 'react-router-dom';
import { SearchbarChangeEventDetail } from '@ionic/core';

interface Course {
  id: number;
  title: string;
}

const Busqueda: React.FC = () => {
  const { searchQuery: initialSearchQuery } = useParams<{ searchQuery: string }>();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'Curso 1' },
    { id: 2, title: 'Curso 2' },
    { id: 3, title: 'Curso 3' },
  ]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    setFilteredCourses(
      courses.filter(course =>
        searchQuery.trim() === '' || course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, courses]);

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent id = "main">
        <div className="custom-card-title">
          <h2 style={{textAlign: 'center'}}>Búsqueda</h2>
          <IonSearchbar 
            value={searchQuery}
            onIonInput={(e: CustomEvent<SearchbarChangeEventDetail>) => setSearchQuery(e.detail.value!)}
            onKeyPress={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' && searchQuery.trim() !== '') {
                history.push(`/busqueda/${searchQuery.trim()}`);
              }
            }}
          />
        </div>
        <div className="custom-card">
          {searchQuery && filteredCourses.length === 0 ? (
            <IonItem>Curso no encontrado</IonItem>
          ) : (
            filteredCourses.map(filteredCourse => (
              <IonItem button key={filteredCourse.id} onClick={() => {history.push(`/curso/${filteredCourse.id}`)}}>{filteredCourse.title}</IonItem>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Busqueda;