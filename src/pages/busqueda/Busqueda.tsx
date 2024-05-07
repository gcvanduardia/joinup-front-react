import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem } from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Busqueda.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { useHistory } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
}

const Busqueda: React.FC = () => {
  const { searchQuery } = useParams<{ searchQuery: string }>();
  const history = useHistory();
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'Curso 1' },
    { id: 2, title: 'Curso 2' },
    { id: 3, title: 'Curso 3' },
  ]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredCourses(courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery, courses]);

  return (
    <IonPage>
      <MenuToolbar />
      <IonContent id = "main">
        <div className="custom-card-title">
          <h2 style={{textAlign: 'center'}}>Búsqueda</h2>
        </div>
        <div className="custom-card">
          {filteredCourses.length === 0 ? (
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